import { pick } from 'ramda'
import { writeTags, readTags } from '../id3'
import { Handler } from './utils'

export const update: Handler = async ({ params, body }) => {
  const fileName = params.fileName && String(params.fileName).trim().length !== 0
    ? String(params.fileName)
    : undefined
  
  if (!fileName) { return { status: 404 } }
  const tags = pick(['artist', 'album', 'title'], body)

  try {
    await writeTags(fileName, tags)
    return { status: 200, json: await readTags(fileName) }
  } catch (e) {
    return { status: 404 }
  }
}
