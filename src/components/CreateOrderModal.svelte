<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import PhotoInput from "./PhotoInput.svelte";

  const dispatch = createEventDispatcher();

  let name = "";
  let group = "";
  let groepsfoto = false;
  let photos = [
    {
      tag: "",
      amount: 0
    }
  ];
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

  .body {
	  overflow: hidden;
  }

  button {
    display: block;
  }


</style>

<div transition:fade class="modal-background" />

<div transition:fly={{ y: 200, duration: 1000 }} class="modal">
  <slot name="header" />
  <hr />

  <input type="text" bind:value={name} placeholder="Naam" />

  <input type="text" bind:value={group} placeholder="Groep" />

  <label>
    <input type="checkbox" bind:checked={groepsfoto} />
    Groepsfoto - niet direct printen.
  </label>

  <hr />

  <div class="body">
    {#each photos as photo, i}
      <PhotoInput></PhotoInput>
    {/each}
  </div>

  <button
    on:click={() => {
      photos = [...photos, { tag: '', amount: 0 }];
    }}>
    Extra foto
  </button>
  <hr />

  <div style="display: flex">
    <button on:click={() => dispatch('close')}>close modal</button>
    <div style="flex-grow: 1;" />
    <button
      class="order-button"
      on:click={() => dispatch('order', {
          order: { name: name, group: group, photos: photos },
          group: groepsfoto
        })}>
      {#if groepsfoto}Bestelling plaatsen {:else}Foto's printen {/if}
    </button>
  </div>
</div>
