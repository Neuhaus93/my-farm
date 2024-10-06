<script lang="ts">
	import UpsertTransaction from "$lib/components/upsert-transaction.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>My Farm</title>
</svelte:head>

<section>
	<UpsertTransaction />

	<div class="h-[1000px]"></div>
</section>
