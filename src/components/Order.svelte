<script>
  import { createEventDispatcher } from 'svelte';
  import moment from 'moment';

  export let order;

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

  .body {
    display: flex;
  }

  .photo {
    
  }

  .photo img{ 

  }

  .photo span{ 

  }
</style>

<div class="card status-{order.status}" on:click={() => dispatch('click')}>
  <div class="header"> {order.name} - {order.group} <span class="badge">{ badge }</span></div>
  <div class="body">
      {#each order.photos as { tag, amount, url }, i}
        <div class="photo">
          <span>{amount}X | {tag}</span>
            <img src="{url}" />
        </div>
      {:else}Dit is een lege order {/each}
  </div>
</div>
