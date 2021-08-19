import type { SearchResult, Tune } from './index'

// @ts-ignore - injected by rollup, ts does not know about it 
export const URL: string = __backendUrl__
export const url = (d: string) => `${URL}${d}`

const get = async <T = any>(url: string): Promise<T> => {
  const res = await fetch(url)
  return res.json()
}

const req = (method: string) => async <B = any, R = any>(url: string, body: B): Promise<R> => {
  const res = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    },
  })
  return res.json()
}

const post = req('POST')
const put = req('PUT')

export const fetchArtists = () => get<string[]>(url('artists'));

export const searchLocal = (term: string) => get<Tune[]>(url(`search/local?term=${term}`))

export const searchYt = (term: string) => get<SearchResult[]>(url(`search/yt?term=${term}`))

export const download = (d: SearchResult) => post<SearchResult, Tune>(url('download'), d)

export const setTags = (d: Tune) => put<Tune, Tune>(url(`tags/${d.fileName}`), d)