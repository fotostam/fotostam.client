<script>
  import ApolloClient, { gql } from "apollo-boost";
  import { setClient, query, mutate } from "svelte-apollo";
  import CreateOrderModal from "./components/CreateOrderModal.svelte";
  import Order from "./components/Order.svelte";

  const client = new ApolloClient({
    uri: "http://localhost:4000"
  });

  setClient(client);

  let showOrderModal = false;

  let status = "IN_PRODUCTION";

  let search = "";


  const ORDERS = gql`
    {
      orders {
        id
        name
        group
        photos {
          id
          tag
          amount
          url
        }
      }
    }
  `;

  const orders = query(client, {
    query: ORDERS,
    variables: {}
  });

  const ADD_ORDER = gql`
    mutation createOrder($order : PostOrderInput!) {
      createOrder(order: $order) {
        id
      }
    }
  `;

  async function addOrder(order, group) {
    order.status = group ? "ON_HOLD" :"IN_PRODUCTION";
    try {
      await mutate(client, {
        mutation: ADD_ORDER,
        variables: { order:order }
      });
    } catch (error) {
      console.log(error);
    }
    orders.refetch();
    showOrderModal = false;
  }

  $: orders.refetch({status});

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

  .status {
    align-self: flex-end;
  }

  .grow {
    flex-grow: 1;
  }
</style>

{#if showOrderModal}
  <CreateOrderModal
    on:close={() => (showOrderModal = false)}
    on:order={e => addOrder(e.detail.order, e.detail.group)}>
    <h2 slot="header">Order aanmaken</h2>
  </CreateOrderModal>
{/if}
<div class="body">
  <div class="nav">
    <button on:click={() => (showOrderModal = true)}>Order toevoegen</button>

    <div class="grow" />

    <div class="status">
      <input id="all" type="radio" bind:group={status} value={'ALL'} />
      <label for="all">ALL</label>

      <input id="onhold" type="radio" bind:group={status} value={'ON_HOLD'} />
      <label for="onhold">ON_HOLD</label>

      <input
        id="production"
        type="radio"
        bind:group={status}
        value={'IN_PRODUCTION'} />
      <label for="production">IN_PRODUCTION</label>

      <input
        id="error"
        type="radio"
        bind:group={status}
        value={'ERROR'} />
      <label for="error">ERROR</label>

      <input id="done" type="radio" bind:group={status} value={'DONE'} />
      <label for="done">DONE</label>
    </div>
  </div>

  <div class="orderList">
    {#await $orders}
      <li>Loading...</li>
    {:then result}
      {#each result.data.orders as order, i}
        <Order {order}/>
      {:else}er zijn momenteel geen orders; {/each}
    {:catch}
    {/await}
  </div>
</div>
