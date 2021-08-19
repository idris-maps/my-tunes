<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import XIcon from '@svelte-parts/icons/feather/x'
  import UpIcon from '@svelte-parts/icons/feather/arrow-up'
  import Clickable from './Clickable.svelte'
  import DisplayTune from './DisplayTune.svelte'
  import { queue } from '../utils'

  const { store, moveToTop, remove } = queue
</script>

{#each $store as tune, i (tune.fileName)}
  <div in:fade out:scale class="item">
    <div class="title">
      <DisplayTune {tune} />
    </div>
    <div class="btns">
      {#if i !== 0}
        <Clickable onClick={() => moveToTop(tune)} inline>
          <UpIcon />
        </Clickable>
      {/if}
      <Clickable onClick={() => remove(tune)} inline>
        <XIcon />
      </Clickable>
    </div>
  </div>
{/each}

<style>
  .item {
    display: grid;
    grid-template-columns: auto 3em;
  }
  .btns {
    text-align: right;
  }
  .title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
