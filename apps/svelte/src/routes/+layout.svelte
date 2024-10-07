<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/ui/sidebar/sidebar.svelte";
	let { data, children } = $props();

	const site = {
		name: "My Farm",
		href: "/",
		img: "https://picsum.photos/36/36",
		imgClass: "w-6 h-6",
	};
	let iconClass =
		"flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white";
	let itemClass =
		"flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700";
	let groupClass = "pt-2 space-y-2";
	const items = [
		{ label: "Dashboard", href: "/" },
		{ label: "Categories", href: "/categories" },
	];
</script>

{#if data.user}
	<Sidebar />
{/if}

<main class={`${data.user ? "ml-[256px] " : ""}px-4 py-5`}>
	{@render children()}
</main>
