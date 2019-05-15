<script>
  import ApolloClient, { gql } from "apollo-boost";
  import { setClient, query, mutate } from "svelte-apollo";
  import CreateOrderModal from "./components/CreateOrderModal.svelte";
  import OrderActionModal from "./components/OrderActionModal.svelte";
  import Order from "./components/Order.svelte";

  const client = new ApolloClient({
    uri: "http://localhost:4000"
  });

  setClient(client);

  let showOrderCreateModal = false;

  let orderActionTarget = null;

  let status = "IN_PRODUCTION";

  let search = "";

  const ORDERS_BY_STATUS = gql`
      query OrdersByStatus($status: Status!) {
        ordersByStatus(status: $status) {

          id
          name
          group
          status
          createdAt
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
    query: ORDERS_BY_STATUS,
    variables: {}
  });

  const ADD_ORDER = gql`
    mutation createOrder($order: PostOrderInput!) {
      createOrder(order: $order) {
        id
      }
    }
  `;

  async function addOrder(order, group) {
    order.status = group ? 'ON_HOLD' : 'IN_PRODUCTION';
    try {
      await mutate(client, {
        mutation: ADD_ORDER,
        variables: { order: order }
      });
    } catch (error) {
      console.log(error);
    }
    orders.refetch();
    showOrderCreateModal = false;
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

  .filter {
    align-self: flex-end;
  }

  .grow {
    flex-grow: 1;
  }
</style>

{#if showOrderCreateModal}
  <CreateOrderModal
    on:close={() => (showOrderCreateModal = false)}
    on:order={e => addOrder(e.detail.order, e.detail.group)}>
    <h2 slot="header">Order aanmaken</h2>
  </CreateOrderModal>
{/if}

{#if orderActionTarget}
  <OrderActionModal order={orderActionTarget} on:close={() => (orderActionTarget = null)}>Dit
    is een test</OrderActionModal>
{/if}

<div class="body">
  <div class="nav">
    <button on:click={() => (showOrderCreateModal = true)}>Order toevoegen</button>

    <div class="grow" />

    <div class="filter">
      <input id="onhold" type="radio" bind:group={status} value={'ON_HOLD'} />
      <label for="onhold">ON_HOLD</label>

      <input id="production" type="radio" bind:group={status} value={'IN_PRODUCTION'} />
      <label for="production">PRODUCTION</label>

      <input id="error" type="radio" bind:group={status} value={'ERROR'} />
      <label for="error">ERROR</label>

      <input id="done" type="radio" bind:group={status} value={'DONE'} />
      <label for="done">DONE</label>
    </div>
  </div>

  <div class="orderList">
    {#await $orders}
      <li>Loading...</li>
    {:then result}
      {#each result.data.ordersByStatus as order, i}
        <Order
          on:click={() => {
            orderActionTarget = order;
          }}
          {order} />
      {:else}er zijn momenteel geen orders;{/each}
    {/await}
  </div>
</div>
