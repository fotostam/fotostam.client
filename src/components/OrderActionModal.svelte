<script>
  import { createEventDispatcher } from "svelte";

  export let order;

  const dispatch = createEventDispatcher();

  console.log(order);

  let selectedPhoto = null;
</script>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: white;
  }

  .autocomplete-results {
    display: flex;
  }

  .autocomplete-result {
    cursor: pointer;
    max-width: 150px;
    padding: 1px;
  }

  .autocomplete-result.selected {
    background-color: lightgray;
  }

  img {
    width: 100%;
  }

  button {
    display: block;
  }
</style>

<div class="modal-background" on:click={() => dispatch('close')} />

<div class="modal">
  <slot name="header" />

  {#if order.status == "ON_HOLD"}
    <button on:click={() => dispatch('close')}>Order afdrukken</button>
  {:else if  order.status == "IN_PRODUCTION"}
    <button on:click={() => dispatch('close')}>Order afronden</button>
  {:else}
    <!-- else content here -->
  {/if}

  <hr />
  <div class="autocomplete-results">
    {#each order.photos as photo, i}
      <div
        class="autocomplete-result {selectedPhoto == photo.id ? 'selected' : ''}"
        on:click={e => {
          selectedPhoto = photo.id;
        }}>
        <img src={photo.url} alt={photo.tag} />
        <span>{photo.amount}X | {photo.tag}</span>
      </div>
    {/each}
  </div>

  <hr />
  <div style="display: flex">
    <button on:click={() => dispatch('close')}>close modal</button>
    <div style="flex-grow: 1;" />
    <button
      disabled={!selectedPhoto}
      on:click={() => {
        alert("photo wordt geprint");
        selectedPhoto = null;
      }}>
      Print selected
    </button>
  </div>
</div>
