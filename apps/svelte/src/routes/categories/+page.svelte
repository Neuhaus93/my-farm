<script lang="ts">
	import { Table, type TableProps } from "svelte-5-ui-lib";
	let { data } = $props();

	const tableItems: TableProps["tableItems"] = data.categories.map((c) => ({
		name: c.name,
	}));
</script>

<Table {tableItems} shadow />
