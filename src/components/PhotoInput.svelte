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
</style>

<div class="autocomplete">
  <input bind:value type="text" />
  {#await $photos}
    <li>Loading...</li>
  {:then results}
    <div class="autocomplete-results {!isOpen ? ' hide-results' : ''}">
      {#each results.data.findImage as result, i}
        <div class="autocomplete-result" on:click={e => dispatch('select',{tag:result.filename})}>
          <img src={result.url} alt={result.filename} />
        </div>
      {/each}
    </div>
  {/await}
</div>
