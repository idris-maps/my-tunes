export * from './store'
export * from './requests'

export interface Tune {
  artist: string
  fileName: string
  title: string
}

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

const numPad = (d: number) => d < 10 ? `0${d}` : String(d)

export const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return numPad(m)  + ':' + numPad(s)
}
