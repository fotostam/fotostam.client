<script>
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
  import CreateOrderModal from "./components/CreateOrderModal.svelte";
  import Order from "./components/Order.svelte";

  const client = new ApolloClient({
    uri: "localhost:4466"
  });

  setClient(client);

  let showOrderModal = false;

  let filter = "PRODUCTION";

  let search = "";

  let orders = [
    {
      id: "asdfasdfasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Henk",
      group: "Havik",
      status: "PRODUCTION",
      photos: [
        {
          tag: "a1231",
          amount: 2
        }
      ]
    },
    {
      id: "asdfasdjhffasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Beer",
      group: "Havik",
      status: "ON_HOLD",
      photos: [
        {
          tag: "c1231",
          amount: 60
        }
      ]
    },
    {
      id: "asdfasfghdfasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Koe",
      group: "Walvissen",
      status: "DONE",
      photos: [
        {
          tag: "a12331",
          amount: 2
        }
      ]
    },
    {
      id: "asdfasdfasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Henk",
      group: "Havik",
      status: "PRODUCTION",
      photos: [
        {
          tag: "a1231",
          amount: 2
        }
      ]
    },
    {
      id: "asdfasdjhffasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Beer",
      group: "Havik",
      status: "ON_HOLD",
      photos: [
        {
          tag: "c1231",
          amount: 60
        }
      ]
    },
    {
      id: "asdfasfghdfasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Koe",
      group: "Walvissen",
      status: "DONE",
      photos: [
        {
          tag: "a12331",
          amount: 2
        }
      ]
    },
    {
      id: "asdfasdfasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Henk",
      group: "Havik",
      status: "PRODUCTION",
      photos: [
        {
          tag: "a1231",
          amount: 2
        },
        {
          tag: "a1231",
          amount: 2
        },
        {
          tag: "a1231",
          amount: 2
        }
      ]
    },
    {
      id: "asdfasdjhffasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Beer",
      group: "Havik",
      status: "ON_HOLD",
      photos: [
        {
          tag: "c1231",
          amount: 60
        }
      ]
    },
    {
      id: "asdfasfghdfasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Koe",
      group: "Walvissen",
      status: "DONE",
      photos: [
        {
          tag: "a12331",
          amount: 2
        }
      ]
    },
    {
      id: "asdfasdfasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Henk",
      group: "Havik",
      status: "PRODUCTION",
      photos: [
        {
          tag: "a1231",
          amount: 2
        }
      ]
    },
    {
      id: "asdfasdjhffasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Beer",
      group: "Havik",
      status: "ON_HOLD",
      photos: [
        {
          tag: "c1231",
          amount: 60
        },
        {
          tag: "c1231",
          amount: 60
        }
      ]
    },
    {
      id: "asdfasfghdfasdfa",
      createdAt: "234234234",
      updatedAt: "234234234",
      name: "Koe",
      group: "Walvissen",
      status: "DONE",
      photos: [
        {
          tag: "a12331",
          amount: 2
        }
      ]
    }
  ];

  $: filteredOrders =
    filter === "ALL" ? orders : orders.filter(order => order.status === filter);

  function handleOrderClick() {
    console.log("handle click");
  }
</script>

<style>
  :global(body) {
    padding: 0;
    background-color: grey;
  }

  button {
    color: deeppink;
  }

  .nav {
    display: flex;
    background-color: lightgray;
    padding: 10px;
  }

  input[type="radio"] {
    position: absolute;
    left: -9999em;
    top: -9999em;
  }
  input[type="radio"] + label {
    float: left;
    padding: 0.5em 1em;
    cursor: pointer;
    border: 1px solid #28608f;
    margin-right: -1px;
    margin-bottom: 3px;
    color: #fff;
    background-color: #428bca;
  }

  input[type="radio"]:checked + label {
    background-color: #3277b3;
  }

  .orderList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    background-color: grey;
    grid-auto-flow: dense;
    grid-auto-rows: auto;
    padding: 10px;
    height: 100%;
  }

  .filter {
    align-self: flex-end;
  }

  .grow {
    flex-grow: 1;
  }
</style>

{#if showOrderModal}
  <CreateOrderModal
    on:close={() => (showOrderModal = false)}
    on:order={e => console.log(e.detail)}>
    <h2 slot="header">Order aanmaken</h2>
  </CreateOrderModal>
{:else}
  <div class="body">
    <div class="nav">
      <button on:click={() => (showOrderModal = true)}>Order toevoegen</button>

      <div class="grow" />

      <div class="filter">
        <input id="all" type="radio" bind:group={filter} value={'ALL'} />
        <label for="all">ALL</label>

        <input
          id="onhold"
          type="radio"
          bind:group={filter}
          value={'ON_HOLD'} />
        <label for="onhold">ON_HOLD</label>

        <input
          id="production"
          type="radio"
          bind:group={filter}
          value={'PRODUCTION'} />
        <label for="production">PRODUCTION</label>

        <input id="done" type="radio" bind:group={filter} value={'DONE'} />
        <label for="done">DONE</label>
      </div>
    </div>

    <div class="orderList">
      {#each filteredOrders as order, i}
        <Order {order} />
      {:else}er zijn momenteel geen orders; {/each}
    </div>
  </div>
{/if}
