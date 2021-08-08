import { tunes } from '../id3'
import { Handler, getString } from './utils'

export const all: Handler = async () => ({
  status: 200,
  json: tunes.getArtists()
})

export const songs: Handler = async props => {
  const artist = getString('params', 'artist', props)

  if (!artist) { return { status: 400 } }

  return { status: 200, json: tunes.getByArtist(decodeURIComponent(artist)) }
}
