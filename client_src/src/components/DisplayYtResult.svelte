<script lang="ts">
  import Clickable from './Clickable.svelte'
  import { formatDuration } from '../utils'
  import type { SearchResult } from '../utils'

  export let result: SearchResult
  export let onClick: (d: SearchResult) => void = () => {}
</script>

<div class="container">
  <Clickable onClick={() => onClick(result)}>
    <div class="title">{result.fulltitle}</div>
    <div class="details">
      <div class="artist">{result.artist || result.channel}</div>
      <div>{formatDuration(result.duration)}</div>
    </div>
  </Clickable>
</div>

<style>
  .container {
    padding: 0.5em;
  }
  .details {
    display: grid;
    grid-template-columns: auto 3em;
  }
  .title,
  .artist {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .title {
    font-weight: bolder;
  }
</style>
