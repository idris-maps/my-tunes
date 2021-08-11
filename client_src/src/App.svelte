<script lang="ts">
  import Player from './components/Player.svelte'
  import SearchLocal from './components/SearchLocal.svelte'
  import type { Tune } from './utils'

  let tune: Tune | undefined
</script>

<main>
  <Player {tune} />
  <SearchLocal onSelect={d => tune = d} />
</main>
