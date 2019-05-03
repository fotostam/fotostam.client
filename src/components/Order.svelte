<script >
    export let order;
</script>

<style>
.card {
    background-color: lightblue;
    max-width: 300px;
    padding: 10px;
}

.header {
    background-color: blue;
    color: white;
}

.body {

}
</style>

<div class="card">
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
