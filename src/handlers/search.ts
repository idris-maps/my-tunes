import { Handler } from './utils'
import { tunes } from '../id3'
import { search } from '../youtube-dl'

const parseQuery = (query: any) => ({
  term: query.term && String(query.term).trim().length !== 0
    ? String(query.term)
    : undefined,
  items: Number.isInteger(Number(query.items)) ? Number(query.items) : undefined,
})

export const local: Handler = async ({ query }) => {
  const { term, items } = parseQuery(query)
  const json = term ? tunes.search(term, items) : []
  return { status: 200, json }
}

export const artists: Handler = async ({ query }) => {
  const { term, items } = parseQuery(query)
  const json = term ? tunes.searchArtist(term, items) : []
  return { status: 200, json }
}

export const yt: Handler = async ({ query }) => {
  const { term, items } = parseQuery(query)
  const json = term ? await search(term, items) : []
  return { status: 200, json }
}
