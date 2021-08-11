// @ts-ignore - injected by rollup, ts does not know about it 
export const URL: string = __backendUrl__
export const url = (d: string) => `${URL}${d}`

export interface Tune {
  artist: string
  fileName: string
  title: string
}

const get = async <T = any>(url: string): Promise<T> => {
  const res = await fetch(url)
  return res.json()
}

export const fetchArtists = () => get<string[]>(url('artists'));

export const searchLocal = (term: string) => get<Tune[]>(url(`search/local?term=${term}`))
