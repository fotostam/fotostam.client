<script>
    import ApolloClient from 'apollo-boost';
    import { setClient } from 'svelte-apollo';
    import CreateOrderModal from "./components/CreateOrderModal.svelte";
    import Order from "./components/Order.svelte";

    const client = new ApolloClient({
        uri: 'localhost:4466'
    });

    setClient(client);

    let showOrderModal = false;

    let filter = "PRODUCTION";

    let search = "";

    let orders = [
        {
            id: "asdfasdfasdfa",
            createdAt: '234234234',
            updatedAt: '234234234',
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
                    createdAt: '234234234',
                    updatedAt: '234234234',
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
                            createdAt: '234234234',
                            updatedAt: '234234234',
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

    $: filteredOrders = orders.filter((order) => order.status === filter);

    function handleOrderClick() {
        console.log("handle click");
    }
</script>

{#if showOrderModal}
    <CreateOrderModal on:close="{() => showOrderModal = false}" on:order="{(e)=>console.log(e.detail)}">
        <h2 slot="header">
            Order aanmaken
        </h2>


    </CreateOrderModal>
{:else}
    <div class="body">
        <div class="nav">
            <button on:click="{() => showOrderModal = true}">
                Order toevoegen
            </button>

            <input type="text" bind:value={search}>

            <div class="grow"></div>

            <div class="filter">
                <input id="onhold" type=radio bind:group={filter} value={"ON_HOLD"}>
                <label for="onhold">ON_HOLD</label>

                <input id="production" type=radio bind:group={filter} value={"PRODUCTION"}>
                <label for="production"> PRODUCTION</label>

                <input id="done" type=radio bind:group={filter} value={"DONE"}>
                <label for="done">DONE</label>
            </div>

        </div>

        <div class="orderList">
            {#each filteredOrders as order, i}
                    <Order order={order}></Order>
            {:else}
                er zijn momenteel geen orders;
            {/each}
        </div>
    </div>
{/if}

<style>
 html {
    background-color: lightblue;
 }

 button {
    color: deeppink;
 }

 .nav {
    display:flex;

 }

 input[type=radio] {
   position: absolute;
   left: -9999em;
   top: -9999em;
 }
 input[type=radio] + label {
   float: left;
   padding: 0.5em 1em;
   cursor: pointer;
   border: 1px solid #28608f;
   margin-right: -1px;
   margin-bottom: 3px;
   color: #fff;
   background-color: #428bca;
 }

 input[type=radio]:checked + label {
   background-color: #3277b3;
 }

 .orderList {
    display: grid;
 }

 .filter {
    align-self: flex-end;
 }

 .grow {
    flex-grow: 1;
 }
</style>
