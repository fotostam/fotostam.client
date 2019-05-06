<script>
  import { createEventDispatcher } from "svelte";

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

<div class="modal-background" on:click={() => dispatch('close')} />

<div class="modal">
  <slot name="header" />
  <hr />

  <input type="text" bind:value={name} placeholder="Naam" />

  <input type="text" bind:value={group} placeholder="Groep" />

  <label>
    <input type="checkbox" bind:checked={groepsfoto} />
    Groepsfoto - niet direct printen.
  </label>

  <hr />

  {#each photos as photo, i}
    <div class="photo-input">
      <input type="text" bind:value={photo.tag} />
      <input type="number" min="0" bind:value={photo.amount} />
    </div>
  {/each}

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
