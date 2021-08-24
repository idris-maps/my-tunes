import { App } from '@tinyhttp/app'
import { json } from 'body-parser'
import cors from 'cors'
import config from './config'
import { artists, handle, search, tags, download, audioFiles } from './handlers'
import { tunes } from './id3'

const app = new App()
app.use(json())

if (process.env.DEV) {
  app.use(cors())
}

app.get('/tunes/:fileName', audioFiles)

app.get('/search/artists', handle(search.artists))
app.get('/search/local', handle(search.local))
app.get('/search/yt', handle(search.yt))

app.get('/artists', handle(artists.all))
app.get('/artists/:artist/songs', handle(artists.songs))

app.put('/tags/:fileName', handle(tags.update))

app.post('/download', handle(download.fromYt))

app.listen(config.port, async () => {
  console.log(`Started on ${config.port}`)
  tunes.refresh()
})
