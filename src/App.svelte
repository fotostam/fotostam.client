<script>
  import ApolloClient, { gql } from "apollo-boost";
  import { setClient, query, mutate, subscribe } from "svelte-apollo";
  import CreateOrderModal from "./components/CreateOrderModal.svelte";
  import OrderActionModal from "./components/OrderActionModal.svelte";
  import Order from "./components/Order.svelte";
  import PhotoInput from "./components/PhotoInput.svelte";

  const client = new ApolloClient({
    uri: "http://localhost:4000"
  });

  setClient(client);

  let showOrderCreateModal = false;

  let orderActionTarget = null;

  let status = "IN_PRODUCTION";

  let search = "";

  let listView = false;

  const ORDERS_BY_STATUS = gql`
    query OrdersByStatus($status: Status!) {
      ordersByStatus(status: $status) {
        id
        name
        group
        status
        createdAt
        subtype
        camp
        groupphoto
        digital
        print
        photos {
          id
          tag
          status
          amount
          url
        }
      }
    }
  `;

  const orders = query(client, {
    query: ORDERS_BY_STATUS,
    variables: {
      status: status
    }
  });

  const ADD_ORDER = gql`
    mutation createOrder($order: PostOrderInput!) {
      createOrder(order: $order) {
        id
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

  async function addOrder(order) {
    if (order.groupphoto) order.status = "ON_HOLD";
    else if (order.digital && !order.print) order.status = "DONE";
    else if (order.print) order.status = "IN_PRODUCTION";
    else order.status = "ERROR";

    console.log(order);

    try {
      const result = await mutate(client, {
        mutation: ADD_ORDER,
        variables: { order: order }
      });

      console.log(result);

      if (result && order.status == "IN_PRODUCTION") {
        await mutate(client, {
          mutation: PRINT_ORDER,
          variables: {
            id: result.data.createOrder.id
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    orders.refetch();
    showOrderCreateModal = false;
  }

  const NEW_ORDER = gql`
    subscription {
      newOrder {
        id
        name
      }
    }
  `;

  // const orderSubscription = subscribe(client, { query: NEW_ORDER });

  // orderSubscription.subscribe((data)=> {
  //   console.log(data);
  // })

  $: orders.refetch({ status });
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

  .orderGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    background-color: grey;
    grid-auto-flow: dense;
    grid-auto-rows: auto;
    padding: 10px;
    height: 100%;
  }
  
  .orderList {

  }

  .filter {
    align-self: flex-end;
  }

  .grow {
    flex-grow: 1;
  }

  /** Switch
 -------------------------------------*/

.switch input {
  position: absolute;
  opacity: 0;
}

/**
 * 1. Adjust this to size
 */

.switch {
  display: inline-block;
  font-size: 20px; /* 1 */
  height: 1em;
  width: 2em;
  background: #BDB9A6;
  border-radius: 1em;
  margin: 10px;
}

.switch div {
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background: #FFF;
  box-shadow: 0 0.1em 0.3em rgba(0,0,0,0.3);
  -webkit-transition: all 300ms;
     -moz-transition: all 300ms;
          transition: all 300ms;
}

.switch input:checked + div {
  -webkit-transform: translate3d(100%, 0, 0);
     -moz-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
}
</style>

{#if showOrderCreateModal}
  <CreateOrderModal
    on:close={() => (showOrderCreateModal = false)}
    on:order={e => addOrder(e.detail.order)}>
    <h2 slot="header">Order aanmaken</h2>
  </CreateOrderModal>
{/if}

{#if orderActionTarget}
  <OrderActionModal
    order={orderActionTarget}
    on:close={() => {
      orderActionTarget = null;
      orders.refetch(status);
    }}>
    Dit is een test
  </OrderActionModal>
{/if}

<div class="body">
  <div class="nav">
    <button on:click={() => (showOrderCreateModal = true)}>
      Order toevoegen
    </button>

    <div class="grow" />

    <input type="text" bind:value={search}>

    <div class="grow" />

    <label class="switch"><input type=checkbox bind:checked={listView}><div></div></label>

    <div class="filter">
      <input id="onhold" type="radio" bind:group={status} value={'ON_HOLD'} />
      <label for="onhold">ON_HOLD</label>

      <input
        id="production"
        type="radio"
        bind:group={status}
        value={'IN_PRODUCTION'} />
      <label for="production">PRODUCTION</label>

      <input id="error" type="radio" bind:group={status} value={'ERROR'} />
      <label for="error">ERROR</label>

      <input id="done" type="radio" bind:group={status} value={'DONE'} />
      <label for="done">DONE</label>
    </div>
  </div>

  {#if search.length > 0}
    <PhotoInput
      on:select={e => {
        photos = [...photos, { tag: e.detail.tag, amount: 1, status: 'HEALTHY' }];
      }} />
  {:else}
  <div class="{ listView?"orderList":"orderGrid"}">
    {#await $orders}
      <li>Loading...</li>
    {:then result}
      {#each result.data.ordersByStatus as order, i}
        <Order
          on:click={() => {
            orderActionTarget = order;
          }}
          listView={listView}
          {order} />
      {:else}er zijn momenteel geen orders;{/each}
    {:catch}

    {/await}
  </div>
  {/if}
</div>
