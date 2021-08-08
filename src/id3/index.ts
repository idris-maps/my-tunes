import ID3 from 'node-id3'
import { init, take, uniq } from 'ramda'
import Fuse from 'fuse.js'
import config from '../config'
import { ls } from '../utils'

export interface TuneInfo {
  album?: string
  artist: string
  title: string
  fileName: string
}

export const readTags = async (fileName: string): Promise<TuneInfo> =>
  new Promise((resolve, reject) =>
    ID3.read(`${config.audioDir}/${fileName}`, (err, tags) => {
      if (err) { return reject(err) }
      const album = tags.album
      const artist = tags.artist || 'Unknown artist'
      const title = tags.title || init(fileName.split('.')).join('.')
      return resolve({ album, artist, title, fileName })
    })
  )

export const writeTags = async (fileName: string, tags: ID3.Tags): Promise<boolean> =>
  new Promise(resolve => {
    const res = ID3.update(tags, `${config.audioDir}/${fileName}`)
    return resolve(typeof(res) === 'boolean' && res)
  })

export const readAllTags = async (fileNames?: string[]) => {
  const files = fileNames || await ls(config.audioDir)
  return Promise.all(files.map(readTags))
}

const sortBy = <T>(key: string, d: T[]) => d.sort((a, b) => a[key] > b[key] ? 1 : -1)

const initTunes = () => {
  let data: TuneInfo[] = []
  let artists: string[] = []
  let tunesFuse: Fuse<TuneInfo> = new Fuse([])
  let artistsFuse: Fuse<{ artist: string }> = new Fuse([])

  return {
    refresh: async () => {
      data = await readAllTags()
      artists = uniq(data.map(d => d.artist.trim())).sort()
      tunesFuse = new Fuse(data, { keys: ['artist', 'title'] })
      artistsFuse = new Fuse(artists.map(artist => ({ artist })), { keys: ['artist']})
      return undefined
    },
    getAll: () => data,
    getArtists: () => artists,
    getByArtist: (artist: string) =>
      sortBy('title', data.filter(d => d.artist.toLowerCase() === artist.toLowerCase())),
    searchArtist: (term: string, items: number = 3) =>
      take(items, artistsFuse.search(term)).map(d => d.item),
    search: (term: string, items: number = 5) =>
      take(items, tunesFuse.search(term)).map(d => d.item),
  }
}

export const tunes = initTunes()