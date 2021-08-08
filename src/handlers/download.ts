import { getString, Handler } from './utils'
import { download } from '../youtube-dl'
import { readTags, writeTags } from '../id3'

export const fromYt: Handler = async props => {
  const url = getString('body', 'webpage_url', props)
  const title = getString('body', 'fulltitle', props)
  const artist = getString('body', 'artist', props) || 'Unknown artist'

  if (!url) {
    return {
      status: 400,
      json: { message: '"url" is not defined' }
    }
  }

  const id = await download(url)
  const fileName = `${id}.ogg`
  await writeTags(fileName, { artist, title })

  return { status: 200, json: { id: await readTags(fileName) } }
}
