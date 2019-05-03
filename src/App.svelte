<script>
    import ApolloClient from 'apollo-boost';
    import { setClient } from 'svelte-apollo';

    const client = new ApolloClient({
        uri: 'localhost:4466'
    });

    setClient(client);

    import CreateOrderModal from "./components/CreateOrderModal.svelte";

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

<style>

</style>

{#if showOrderModal}
    <CreateOrderModal on:close="{() => showOrderModal = false}" on:order="{()=>console.log('placeOrder')}">
        <h2 slot="header">
            Order aanmaken
        </h2>


    </CreateOrderModal>
{:else}
    <button on:click="{() => showOrderModal = true}">
        Order toevoegen
    </button>

    {search}

    <input type="text" bind:value={search}>

    <label>
    	<input type=radio bind:group={filter} value={"PRODUCTION"}>
    	PRODUCTION
    </label>

    <label>
    	<input type=radio bind:group={filter} value={"ON_HOLD"}>
    	ON_HOLD
    </label>

    <label>
    	<input type=radio bind:group={filter} value={"DONE"}>
    	DONE
    </label>

    <ul>
        {#each filteredOrders as {name,photos,status,group}, i}
                <li on:click="{handleOrderClick}">{i + 1}: {status} | {name} - {group}</li>
        {:else}
            er zijn momenteel geen orders;
        {/each}
    </ul>
{/if}
