<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { page } from "$app/stores";
	import { House, Tag } from "lucide-svelte";
	type SidebarItem = {
		label: string;
		href: string;
		Icon: typeof House;
		selected: boolean;
	};
	let sidebarItems: SidebarItem[] = $state([
		{ label: "Dashboard", href: "/", Icon: House, selected: true },
		{ label: "Categories", href: "/categories", Icon: Tag, selected: false },
	]);
	page.subscribe((value) => {
		sidebarItems = sidebarItems.map((i) => ({
			...i,
			selected: value.route.id === i.href,
		}));
	});
</script>

{#snippet item({ label, href, Icon, selected }: SidebarItem)}
	<li>
		<a
			class={twMerge(
				"flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100",
				selected
					? "bg-gray-100 dark:bg-neutral-700 dark:text-white"
					: "dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300",
			)}
			{href}
		>
			<Icon size={20} />
			{label}
		</a>
	</li>
{/snippet}

<div
	id="hs-offcanvas-example"
	class="hs-overlay fixed bottom-0 start-0 top-0 z-[60] w-64 -translate-x-full transform overflow-y-auto border-e border-gray-200 bg-white pb-10 pt-7 transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2"
	role="dialog"
	tabindex="-1"
	aria-label="Sidebar"
>
	<div class="px-6">
		<a
			class="flex-none text-xl font-semibold text-black focus:opacity-80 focus:outline-none dark:text-white"
			href="/"
			aria-label="Brand">Brand</a
		>
	</div>
	<nav
		class="hs-accordion-group flex w-full flex-col flex-wrap p-6"
		data-hs-accordion-always-open
	>
		<ul class="space-y-1.5">
			{#each sidebarItems as i}
				{@render item(i)}
			{/each}
		</ul>
	</nav>
</div>
