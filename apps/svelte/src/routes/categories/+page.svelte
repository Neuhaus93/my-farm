<script lang="ts">
	let { data } = $props();

	const tableItems = data.categories.map((c) => ({
		name: c.name,
	}));
</script>

<div>{JSON.stringify(tableItems)}</div>
