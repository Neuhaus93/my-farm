<script lang="ts">
	import { i18n } from '$lib/i18n';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import 'leaflet/dist/leaflet.css';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children, data } = $props();
</script>

<svelte:head>
	<title>My Farm</title>
</svelte:head>

<ParaglideJS {i18n}>
	<ModeWatcher />

	{#if data.user}
		<Sidebar.Provider>
			<AppSidebar logo={data.logo} regions={data.regions} />
			<main class="flex min-h-svh flex-1 flex-col">
				<header class="flex justify-between p-4">
					<Sidebar.Trigger />
					<ThemeToggle />
				</header>
				{@render children()}
			</main>
		</Sidebar.Provider>
	{:else}
		{@render children()}
	{/if}
</ParaglideJS>
