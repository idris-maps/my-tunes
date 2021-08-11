<script lang="ts">
  import { fetchArtists } from '../utils'
  import Clickable from './Clickable.svelte'
  import Spinner from './Spinner.svelte'

  export let onSelect: (d: string) => void

  let value = ''

  const onClick = (d: string) => () => onSelect(d)
  const filter = (artists: string[], value: string) => {
    const v = value.trim()
    return v === '' ? artists : artists.filter((d) => d.toLowerCase().startsWith(v))
  }
</script>


{#await fetchArtists()}
  <Spinner />
{:then artists}
  <input bind:value />
  {#each filter(artists, value) as artist}
    <Clickable onClick={onClick(artist)}>
      <div>{artist}</div>
    </Clickable>
  {/each}
{/await}
