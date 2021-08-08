import { Request, Response } from '@tinyhttp/app'
import { path } from 'ramda'

export interface HandlerResponse {
  status: number
  json?: any
}

export interface HandlerProps<Body, Params, Query> {
  body: Body
  params: Params
  query: Query
}

export type Handler<Body = any, Params = any, Query = any> = (props: HandlerProps<Body, Params, Query>) => Promise<HandlerResponse>

export const handle = (handler: Handler) =>
  async (req: Request, res: Response) => {
    try {
      const { status, json } = await handler({
        body: req.body || {},
        params: req.params || {},
        query: req.query || {},
      })
      return res.status(status).json(json || {})
    } catch (e) {
      console.log(e)
      return res.sendStatus(500)
    }
  }

export const getString = (
  from: 'body' | 'query' | 'params',
  key: string,
  props: HandlerProps<any, any, any>
) => {
  const value = path([from, key], props)
  return !value || String(value).trim().length === 0
    ? undefined
    : String(value)
}
