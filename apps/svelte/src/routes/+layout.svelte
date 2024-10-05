<script lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarBrand,
		SidebarItem,
	} from "svelte-5-ui-lib";
	import {
		ArrowRightToBracketOutline,
		BookmarkOutline,
		ChartOutline,
	} from "flowbite-svelte-icons";
	import "../app.css";
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
		{ label: "Dashboard", href: "/", icon: ChartOutline },
		{ label: "Categories", href: "/categories", icon: BookmarkOutline },
	];
</script>

{#if data.user}
	<Sidebar
		class="h-full"
		activeClass="bg-gray-100 dark:bg-gray-700"
		backdrop={false}
		isOpen={true}>
		<SidebarGroup class={groupClass}>
			<SidebarBrand {site} />
			{#each items as item (item.label)}
				<SidebarItem
					label={item.label}
					href={item.href}
					aClass={itemClass}
					spanClass="ml-4">
					{#snippet iconSlot()}
						<item.icon class={iconClass} />
					{/snippet}
				</SidebarItem>
			{/each}

			<form method="post" action="/logout">
				<button class={`${itemClass} w-full`}>
					<ArrowRightToBracketOutline class={iconClass} />
					<span class="ms-3">Sign Out</span>
				</button>
			</form>
		</SidebarGroup>
	</Sidebar>
{/if}

<main class={`${data.user ? "ml-[256px] " : ""}px-4 py-5`}>
	{@render children()}
</main>
