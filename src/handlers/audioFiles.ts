import { Request, Response } from '@tinyhttp/app'
import { access, createReadStream } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'
import config from '../config'

const exists = async (path: string) => {
  try {
    await promisify(access)(path)
    return true
  } catch {
    return false
  }
}

export default async (req: Request, res: Response) => {
  const file = req.params.fileName
  const path = resolve(config.audioDir, file)
  const pathExists = await exists(path)

  if (!pathExists) {
    return res.sendStatus(404)
  }

  res.setHeader('Content-Type', 'audio/mpeg')
  return createReadStream(path).pipe(res)
}
