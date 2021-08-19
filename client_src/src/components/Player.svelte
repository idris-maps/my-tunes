<script lang="ts">
  import DisplayTune from './DisplayTune.svelte'
  import { url, queue } from '../utils'
  import type { Tune } from '../utils'

  export let tune: Tune | undefined

  let audio: HTMLAudioElement
  $: {
    if (audio && tune) {
      audio.src = url(`tunes/${tune.fileName}`)
      audio.play()
      audio.focus()
    }
  }
</script>

<div>
  {#if tune}
    <DisplayTune {tune} />
  {/if}
</div>
<audio
  bind:this={audio}
  on:ended={() => queue.removeFirst()}
  controls
/>

<style>
  div {
    min-height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
  }
  audio {
    width: 100%;
  }
</style>

