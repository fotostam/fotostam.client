<script>
  export let order;
  import { createEventDispatcher } from 'svelte';
  import moment from 'moment';

  const dispatch = createEventDispatcher();
  

  let badge = moment(order.createdAt).format('dd HH:mm');
</script>

<style>
  .card {
    background-color: lightblue;
    cursor: pointer;
  }

  .header {
    background-color: blue;
    color: white;
    padding: 10px;
  }

  .status-DONE {
    background-color: lightgreen;
  }

  .status-DONE .header {
    background-color: green;
  }

  .status-ON_HOLD {
    background-color: lightcoral;
  }

  .status-ON_HOLD .header {
    background-color: orange;
  }

  .status-ERROR {
    background-color: lightcoral;
  }

  .status-ERROR .header {
    background-color: red;
  }

  .badge {
    background-color: grey
  }
</style>

<div class="card status-{order.status}" on:click={() => dispatch('click')}>
  <div class="header"> {order.name} - {order.group} <span class="badge">{ badge }</span></div>
  <div class="body">
    <ul>
      {#each order.photos as { tag, amount, url }, i}
        <li>{amount}X | {tag}</li>
        <li>
          <img src="{url}" />
        </li>
      {:else}Dit is een lege order {/each}
    </ul>
  </div>
</div>
