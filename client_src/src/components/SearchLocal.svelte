<script lang="ts">
  import Clickable from './Clickable.svelte'
  import DisplayTune from './DisplayTune.svelte'
  import { searchLocal, throttle } from '../utils'
  import type { Tune } from '../utils'
  
  export let onSelect: (d: Tune) => void

  let value = ''
  let tunes: Tune[] = []

  const search = throttle(searchLocal, 1000)

  const onKeyUp = async () => {
    const v = value.trim()
    if (v !== '') {
      tunes = await search(v)
    }
  }

  const onClick = (tune: Tune) => () => {
    onSelect(tune)
    value = ''
    tunes = []
  }
</script>

<input bind:value on:keyup={onKeyUp} />
{#each tunes as tune}
  <Clickable onClick={onClick(tune)}>
    <div class="tune">
      <DisplayTune {tune} />
    </div>
  </Clickable>
{/each}

<style>
  .tune {
    padding: 0.2em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>