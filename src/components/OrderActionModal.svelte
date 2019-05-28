<script>
  import { gql } from "apollo-boost";
  import { getClient, mutate } from "svelte-apollo";
  import { createEventDispatcher } from "svelte";

  export let order;

  const client = getClient();

  const dispatch = createEventDispatcher();

  let selectedPhoto = null;

  const UPDATE_ORDER = gql`
    mutation updateOrder($order: UpdateOrderInput!) {
      updateOrder(order: $order) {
        id
        status
      }
    }
  `;

  const PRINT_ORDER = gql`
    mutation printOrder($id: ID!) {
      printOrder(id: $id) {
        id
      }
    }
  `;

  async function updateOrder(status) {
    let _order = (({ id, status, name, group }) => ({
      id,
      status,
      name,
      group
    }))(order);
    _order.status = status;
    try {
      const result = await mutate(client, {
        mutation: UPDATE_ORDER,
        variables: { order: _order }
      });

      if (result && result.data.updateOrder.status == "IN_PRODUCTION") {
        await mutate(client, {
          mutation: PRINT_ORDER,
          variables: {
            id: result.data.updateOrder.id
          }
        });
      }

      dispatch("close");
    } catch (error) {
      alert(error);
    }
  }
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
    z-index: 101;
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

  {#if order.status == 'ON_HOLD'}
    <button on:click={() => updateOrder('IN_PRODUCTION')}>
      Order afdrukken
    </button>
  {:else if order.status == 'IN_PRODUCTION'}
    <button on:click={() => updateOrder('DONE')}>Order afronden</button>
  {:else}
    <!-- else content here -->
  {/if}

  <hr />
  Naam: {order.name}
  <br />
  Email: {order.email}
  <br />
  Groep: {order.group} {order.camp} {order.subtype}
  <br />
  Status: {order.status}
  <br />
  Groupfoto: {order.groupphoto}
  <br />
  Digital: {order.digital}
  <br />

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
        alert('photo wordt geprint');
        selectedPhoto = null;
      }}>
      Print selected
    </button>
  </div>
</div>
