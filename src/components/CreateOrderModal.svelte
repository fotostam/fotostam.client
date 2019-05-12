<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import PhotoInput from "./PhotoInput.svelte";

  const dispatch = createEventDispatcher();

  let name = "";
  let group = "";
  let groepsfoto = false;
  let photos = [];
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
    display: flex;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 80%;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: white;
  }

  .input {
    min-width: 32em;
    padding-right: 1em;
  }

  .selector {
    width:auto;
    flex-grow: 1;
  }

  .body {
	  overflow: hidden;
  }

  button {
    display: block;
  }

  .photo-input {
    display: flex;
  }

  .photo-input input[type="text"] {
    flex-grow: 1;
  }

  .photo-input input[type="number"] {
    width: 45px;
  }

</style>

<div transition:fade class="modal-background" />

<div transition:fly={{ y: 200, duration: 1000 }} class="modal">
  <div class="input">
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
      <div transition:fly={{ x: 200, duration: 300 }} class="photo-input">
        <input type="text" disabled bind:value={photo.tag} />
        <input type="number" min="0" bind:value={photo.amount} />
      </div>
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
  <div class="selector">
    <PhotoInput on:select={(e) => {
      photos = [...photos, { tag: e.detail.tag, amount: 1 }];
    }}></PhotoInput>
  </div>
</div>
