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

const wait = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

const eq = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)

export const throttle = <A = any, B = void>(func: (d: A) => Promise<B>, ms: number) => {
  let prevTime = 0
  let arg: A | undefined
  let latestUsedArg: A | undefined
  let res: B | undefined
  const onCall = async (d?: A) => {
    if (d) { arg = d }
    let now = new Date().getTime()
    if (arg && !eq(arg, latestUsedArg) && now - prevTime >= ms) {
      latestUsedArg = arg
      prevTime = now
      res = await func(arg)
      return res
    } else if (d) {
      await wait(ms)
      onCall()
      if (res) {
        return res
      }
    }
  }
  return onCall
}