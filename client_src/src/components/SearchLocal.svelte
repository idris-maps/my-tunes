<script lang="ts">
  import Clickable from './Clickable.svelte'
  import DisplayTune from './DisplayTune.svelte'
  import { searchLocal } from '../utils'
  import type { Tune } from '../utils'
  
  export let onSelect: (d: Tune) => void

  let value = ''
  let tunes: Tune[] = []

  const onSearch = async () => {
    const v = value.trim()
    if (v !== '') {
      tunes = await searchLocal(v)
    }
  }

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const onClick = (tune: Tune) => () => {
    onSelect(tune)
    value = ''
    tunes = []
  }
</script>

<input bind:value on:keyup={onEnter} />
<button on:click={onSearch}>Search</button>
{#each tunes as tune, i}
  <Clickable onClick={onClick(tune)} focus={i === 0}>
    <div class="tune">
      <DisplayTune {tune} />
    </div>
  </Clickable>
{/each}

<style>
  .tune {
    padding: 0.2em;
  }
</style>