import { App } from '@tinyhttp/app'
import { json } from 'body-parser'
import serve from 'serve-static'
import config from './config'
import { handle, search } from './handlers'
import { tunes } from './id3'

const app = new App()
app.use(json())

app.use('/tunes', serve(config.audioDir))

app.use('/search/artists', handle(search.artists))
app.use('/search/local', handle(search.local))
app.use('/search/yt', handle(search.yt))

app.listen(config.port, async () => {
  console.log(`Started on ${config.port}`)
  tunes.refresh()
})
