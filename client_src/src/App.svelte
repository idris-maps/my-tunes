<script lang="ts">
  import Player from './components/Player.svelte'
  import SearchLocal from './components/SearchLocal.svelte'
  import Queue from './components/Queue.svelte'
  import { queue } from './utils'
  import type { Tune } from './utils'

  const { store } = queue

  let tune
  
  $: {
    const first = $store[0]
    if (first?.fileName && first.fileName !== tune?.fileName) {
      tune = first
    }
  }

</script>

<main>
  <Player {tune} />
  <div class="split">
    <div>
      <SearchLocal onSelect={queue.add} />
    </div>
    <div>
      <Queue />
    </div>
  </div>
</main>

<style>
  .split {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }
</style>