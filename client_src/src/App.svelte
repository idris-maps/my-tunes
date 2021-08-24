<script lang="ts">
  import Player from './components/Player.svelte'
  import Search from './components/Search.svelte'
  import Queue from './components/Queue.svelte'
  import { queue } from './utils'

  const { store } = queue

  let tune
  
  $: {
    const first = $store[0]
    if (first?.fileName) {
      tune = first
    }
  }

</script>

<main>
  <Player {tune} />
  <div class="split">
    <div>
      <Search onSelect={queue.add} />
    </div>
    <div>
      <Queue />
    </div>
  </div>
</main>

<style>
  .split {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 1em));
    column-gap: 2em;
    padding: 1em;
  }
</style>