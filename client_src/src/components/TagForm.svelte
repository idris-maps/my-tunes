<script lang="ts">
  import { setTags } from '../utils'
  import type { Tune } from '../utils'

  export let tune: Tune
  export let onChange: (d: Tune) => void = () => {}

  let title = tune.title
  let artist = tune.artist

  const onSubmit = async () => {
    const next = await setTags({ ...tune, artist, title })
    onChange(next)
  }
</script>

<div>
  <label for="artist">Title</label>
  <input id="artist" bind:value={title} />
  <label for="artist">Artist</label>
  <input id="artist" bind:value={artist} />
  <button on:click={onSubmit} disabled={tune.fileName === ''}>OK</button>
</div>

<style>
  div {
    padding: 0.5em;
  }
  input {
    width: 100%;
  }
</style>
