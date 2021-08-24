<script>
  import { scale } from 'svelte/transition'
  import Modal from '@svelte-parts/modal'
  let open = false
  const toggle = () => { open = !open }
</script>

<slot name="button" {toggle} />
<Modal open={open} onClose={toggle}>
  <div class="modal" transition:scale>
    <slot name="content" {toggle} />
  </div>
</Modal>

<style>
  .modal {
    background-color: white;
    padding: 2em;
    border-radius: 0.5em;
    min-width: 30vw;
  }
</style>