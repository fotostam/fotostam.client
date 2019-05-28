<script>
  import { gql } from "apollo-boost";
  import { getClient, query } from "svelte-apollo";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let value = "";

  const client = getClient();

  let results = [];

  let isOpen = true;

  const PHOTOS_BY_SEARCH = gql`
    query findImage($tag: String) {
      findImage(tag: $tag) {
        filename
        url
      }
    }
  `;

  const photos = query(client, {
    query: PHOTOS_BY_SEARCH,
    variables: { tag: value }
  });

  $: photos.refetch({ tag: value });
</script>

<style>
  .autocomplete-results {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .autocomplete-result {
    cursor: pointer;
    padding: 1px;
  }

  .autocomplete-result:hover {
    background-color: lightgray;
  }

  input {
    width: 100%;
  }

  img {
    width: 100%;
  }
</style>

<div class="autocomplete">
  <input bind:value type="text" placeholder="Foto zoeken..." />
  {#await $photos}
    <li>Loading...</li>
  {:then results}
    <div class="autocomplete-results {!isOpen ? ' hide-results' : ''}">
      {#if results.data.findImage}
        {#each results.data.findImage.slice(0, 20) as result, i}
          <div
            class="autocomplete-result"
            on:click={e => dispatch('select', { tag: result.filename })}>
            <img src={result.url} alt={result.filename} />
            <span>{result.filename}</span>
          </div>
        {/each}
      {/if}
    </div>
  {/await}
</div>
