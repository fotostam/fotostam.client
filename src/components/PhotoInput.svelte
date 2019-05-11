<script>
  import { gql } from "apollo-boost";
  import { getClient, query } from "svelte-apollo";

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
  * {
    box-sizing: border-box;
  }
  input {
    height: 2rem;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
  .autocomplete {
    position: relative;
  }
  .hide-results {
    display: none;
  }
  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #dbdbdb;
    height: 6rem;
    overflow: auto;
    width: 100%;
    background-color: white;
    box-shadow: 2px 2px 24px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 100;
  }
  .autocomplete-result {
    color: #7a7a7a;
    list-style: none;
    text-align: left;
    height: 2rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }
  .autocomplete-result > :global(span) {
    background-color: none;
    color: #242424;
    font-weight: bold;
  }
  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #dbdbdb;
  }
</style>

<div class="autocomplete">
  <input bind:value type="text" />
  {#await $photos}
    <li>Loading...</li>
  {:then results}
    <ul class="autocomplete-results {!isOpen ? ' hide-results' : ''}">
      {#each results.data.findImage as result, i}
        <li class="autocomplete-result"> {result.filename}</li>
      {/each}
    </ul>
  {/await}
</div>
