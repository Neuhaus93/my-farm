<script lang="ts">
	import "../app.css";
	import "leaflet/dist/leaflet.css";
	import Sidebar from "$lib/ui/sidebar/sidebar.svelte";
	import Header from "$lib/ui/header.svelte";
	import { afterNavigate } from "$app/navigation";
	let { data, children } = $props();

	afterNavigate(() => {
		window.HSStaticMethods.autoInit();
	});
</script>

{#if data.user}
	<Header user={data.user} />

	<Sidebar />
{/if}

<main
	class={data.user
		? "p-6 lg:ml-[256px]"
		: "flex min-h-screen items-center justify-center"}
>
	{@render children()}
</main>
