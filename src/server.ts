import { App } from '@tinyhttp/app'
import { json } from 'body-parser'
import serve from 'serve-static'
import config from './config'
import { handle, search, tags } from './handlers'
import { tunes } from './id3'

const app = new App()
app.use(json())

app.use('/tunes', serve(config.audioDir))

app.get('/search/artists', handle(search.artists))
app.get('/search/local', handle(search.local))
app.get('/search/yt', handle(search.yt))

app.put('/tags/:fileName', handle(tags.update))

app.listen(config.port, async () => {
  console.log(`Started on ${config.port}`)
  tunes.refresh()
})
