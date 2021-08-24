<script lang="ts">
  import Clickable from './Clickable.svelte'
  import DisplayTune from './DisplayTune.svelte'
  import DisplayYtResult from './DisplayYtResult.svelte'
  import TagForm from './TagForm.svelte'
  import Spinner from './Spinner.svelte'
  import {
    searchLocal,
    searchYt,
    download,
  } from '../utils'
  import type { Tune, SearchResult } from '../utils'
  
  export let onSelect: (d: Tune) => void

  let value = ''
  let tunes: Tune[] = []
  let results: SearchResult[] = []
  let choice: SearchResult | undefined = undefined
  let loading: boolean = false
  let downloaded: Tune | undefined

  const search = searchLocal

  const onKeyUp = async () => {
    const v = value.trim()
    if (v !== '') {
      tunes = await search(v)
    }
  }

  const onTuneClick = (tune: Tune) => () => {
    onSelect(tune)
    value = ''
    tunes = []
  }

  const onSearchYt = async () => {
    tunes = []
    loading = true
    results = await searchYt(value)
    value = ''
    loading = false
  }

  const onChooseResult = (d: SearchResult) => async () => {
    choice = d
    results = []
    loading = true
    downloaded = await download(d)
    loading = false
  }

  const onTag = async ({ artist, title }: { artist: string, title: string }) => {
    if (downloaded?.fileName) {
      loading = true
      onSelect({ artist, title, fileName: downloaded.fileName })
      loading = false
      downloaded = undefined
      choice = undefined
    }
  }
</script>

<div class="form">
  <input bind:value on:keyup={onKeyUp} placeholder="Search" />
  {#if value.length > 6}
    <button on:click={onSearchYt}>Search YT</button>
  {/if}
</div>
{#each tunes as tune}
  <Clickable onClick={onTuneClick(tune)}>
    <div class="tune">
      <DisplayTune {tune} />
    </div>
  </Clickable>
{/each}
{#each results as result}
  <DisplayYtResult result={result} onClick={onChooseResult(result)} />
{/each}
{#if choice}
  <TagForm
    tune={{
      artist: choice.artist || choice.channel,
      title: choice.fulltitle,
      fileName: downloaded?.fileName || '',
    }}
    onChange={onTag}
  />
{/if}
{#if loading}
  <Spinner />
{/if}

<style>
  .form {
    width: 100%;
    display: grid;
    grid-template-columns: auto 6em;
  }
  .tune {
    padding: 0.2em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>