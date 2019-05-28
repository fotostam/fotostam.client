<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import PhotoInput from "./PhotoInput.svelte";

  const dispatch = createEventDispatcher();

  let name = "";
  let subtype = "PERSONAL";
  let group = "";
  let camp = 0;
  let groupphoto = false;
  let digital = false;
  let print = true;
  let email = "";
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
    z-index: 100;
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
    z-index: 101;
  }

  .input {
    min-width: 32em;
    padding-right: 1em;
  }

  .selector {
    width: auto;
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

  .group {
    width: 100%;
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

<div transition:fly={{ y: 200, duration: 200 }} class="modal">
  <div class="input">
    <slot name="header" />
    <hr />
    <div class="group">
      <input type="text" bind:value={name} placeholder="Naam" />
    </div>

    <div class="group">
      <input type="email" bind:value={email} placeholder="Email" />
    </div>
    <div class="group">
      <div class="group">
        <input type="text" bind:value={group} placeholder="Groep" />
      </div>
      <select bind:value={camp}>
        <option value={1}>Subkamp 1</option>
        <option value={2}>Subkamp 2</option>
        <option value={3}>Subkamp 3</option>
        <option value={4}>Subkamp 4</option>
        <option value={5}>Subkamp 5</option>
        <option value={6}>Subkamp 6</option>
        <option value={0}>-geen-</option>
      </select>

      <select bind:value={subtype}>
        <option value="BEVERS">Bevers</option>
        <option value="WELPEN">Welpen</option>
        <option value="SCOUTS">Scouts</option>
        <option value="EXPLORERS">Explo</option>
        <option value="PIVO">Pivo</option>
        <option value="STAFF">Staff</option>
        <option value="BRONBEEK">Bronbeek</option>
        <option value="PERSONAL">Persoonlijk</option>
      </select>
    </div>

    <label>
      <input type="checkbox" bind:checked={digital} />
      Digitaal
      <span style="color:gray">- fotos via email versturen (na kamp)</span>
    </label>

    <label>
      <input type="checkbox" bind:checked={print} />
      Printen
      <span style="color:gray">- order direct printen</span>
    </label>

    <label>
      <input type="checkbox" bind:checked={groupphoto} />
      Groepsfoto
      <span style="color:gray">- order is groepsfoto</span>
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

    <hr />

    <div style="display: flex">
      <button on:click={() => dispatch('close')}>close modal</button>
      <div style="flex-grow: 1;" />
      <button
        class="order-button"
        on:click={() => dispatch('order', {
            order: {
              name: name,
              group: group,
              photos: photos,
              subtype: subtype,
              camp: camp,
              digital: digital,
              email: email,
              print: print,
              groupphoto: groupphoto
            }
          })}>
        {#if !print}Order plaatsen{:else}Order printen{/if}
      </button>
    </div>
  </div>
  <div class="selector">
    <PhotoInput
      on:select={e => {
        photos = [...photos, { tag: e.detail.tag, amount: 1, status: 'HEALTHY' }];
      }} />
  </div>
</div>
