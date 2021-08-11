<script lang="ts">
  export let onClick: () => void | undefined
  export let focus: boolean = false
  export let inline: boolean = false

  let div: HTMLDivElement

  $: {
    if (div && focus) {
      div.focus()
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && onClick) { onClick() }
  }
</script>

<div
  class:inline={inline}
  on:click={onClick}
  on:keyup={onKeyUp}
  bind:this={div}
  tabindex="0"
>
  <slot />
</div>

<style>
  div {
    cursor: pointer;
  }
  div:hover {
    background-color: lightgray;
  }
  div:focus {
    background-color: lightgray;
  }
  .inline {
    display: inline;
  }
</style>