<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import XIcon from '@svelte-parts/icons/feather/x'
  import EditIcon from '@svelte-parts/icons/feather/edit'
  import UpIcon from '@svelte-parts/icons/feather/arrow-up'
  import Clickable from './Clickable.svelte'
  import DisplayTune from './DisplayTune.svelte'
  import Modal from './Modal.svelte'
  import TagForm from './TagForm.svelte'
  import { queue } from '../utils'

  const { store, moveToTop, remove, setMeta } = queue
</script>

{#each $store as tune, i (tune.fileName)}
  <div in:fade out:scale animate:flip class="item">
    <div class="title">
      <DisplayTune {tune} />
    </div>
    <div class="btns">
      {#if i !== 0}
        <Clickable onClick={() => moveToTop(tune)} inline>
          <UpIcon />
        </Clickable>
      {/if}
      <Modal let:toggle>
        <span slot="button">
          <Clickable onClick={toggle} inline>
            <EditIcon />
          </Clickable>
        </span>
        <div slot="content">
          <TagForm tune={tune} onChange={(d) => {setMeta(d); toggle()}} />
        </div>
      </Modal>
      <Clickable onClick={() => remove(tune)} inline>
        <XIcon />
      </Clickable>
    </div>
  </div>
{/each}

<style>
  .item {
    display: grid;
    grid-template-columns: auto 4em;
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
