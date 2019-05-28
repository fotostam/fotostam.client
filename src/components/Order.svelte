<script>
  import { createEventDispatcher } from "svelte";
  import moment from "moment";

  export let order;

  const dispatch = createEventDispatcher();

  let badge = moment(order.createdAt).format("dd HH:mm");
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
    background-color: grey;
  }

  .body {
    display: flex;
  }

  .photo {
    position: relative;
    width: 180px;
    height: 220px;
    background: #fff;
    margin: 5px 5px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .photo .imgBx {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    background: #222;
    bottom: 80px;
  }

  .photo .imgBx img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo .details {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    height: 60px;
    text-align: center;
  }

  .photo .details h2 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 17px;
    color: #777;
    text-transform: uppercase;
  }

  .photo span {
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    color:white;
    font-size: 17px;
    font-weight: 600;
    display:block;
    z-index: 10;
    padding: 5px 5px;
    border-radius: 50%;
  }
</style>

<div class="card status-{order.status}" on:click={() => dispatch('click')}>
  <div class="header">
     {order.name} - {order.group}
    <span class="badge">{badge}</span>
  </div>
  <div class="body">
    {#each order.photos as { tag, amount, url }, i}
      <div class="photo">
        <div class="imgBx">
          <img src={url} />
        </div>
        <div class="details">
            <h2>{tag}<br></h2>
        </div>
        <span>{amount}x</span>
      </div>
    {:else}Dit is een lege order{/each}
  </div>
</div>
