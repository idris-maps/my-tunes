<script lang="ts">
  import type { Tune } from '../utils'

  export let tune: Tune | undefined
</script>

{#if tune}
  <span class="title">{tune.title}</span>
  -
  <span class="artist">{tune.artist}</span>
{/if}

<style>
  .artist {
    margin-left: 0.5em;
    font-size: 0.9em;
    font-weight: bolder;
  }
  .title {
    margin-right: 0.5em;
  }
</style>