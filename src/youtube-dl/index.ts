import { has, pipe } from 'ramda'
import { run, safeJsonParse } from '../utils'
import config from '../config'

export interface SearchResult {
  artist?: string
  channel: string
  creator?: string
  duration: number
  fulltitle: string
  id: string
  tags?: string[]
  uploader?: string
  view_count: number
  webpage_url: string
}

const resultRequiredKeys = [
  'channel',
  'duration',
  'id',
  'fulltitle',
  'view_count',
  'webpage_url',
]

const resultOptionalKeys = [
  'artist',
  'tags',
  'creator',
  'uploader',
]

const resultKeys = [...resultRequiredKeys, ...resultOptionalKeys]

const isResult = (d: any): d is SearchResult => d && resultRequiredKeys.every(key => has(key, d))
const pickKeys = (d: any) => {
  if (!d) { return {} }
  return resultKeys.reduce((r, key) => d[key] ? { ...r, [key]: d[key]} : r, {})
}

export const search = async (term: string, numberOfResults: number = 5) => {
  const res = await run(`youtube-dl -j "ytsearch${numberOfResults}:${term}"`)
  return res.split('\n').map(pipe(safeJsonParse, pickKeys)).filter(isResult)
}

export const download = async (url: string) => {
  try {
    await run(`cd ${config.audioDir} && youtube-dl --extract-audio --audio-format vorbis ${url} --id`)
    return true
  } catch (e) {
    return false
  }
}
