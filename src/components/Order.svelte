<script >
    export let order;
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

.body {

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
    background-color: red;
}


</style>

<div class="card status-{order.status}">
    <div class="header">
         {order.name} - {order.group} | {order.createdAt}
    </div>
    <div class="body">
        <ul>
             {#each order.photos as {tag,amount}, i}
                <li>{amount}X | {tag}</li>
             {:else}
                Dit is een lege order
             {/each}
        </ul>
    </div>
</div>
