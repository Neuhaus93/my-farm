<script lang="ts">
	let { data } = $props();

	const headers = [{ label: "Name" }];
	type TableItem = { id: number; name: string };
	const tableItems: TableItem[] = data.categories.map((c) => ({
		id: c.id,
		name: c.name,
	}));
</script>

{#snippet TH(label: string)}
	<th
		scope="col"
		class="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-500"
		>{label}</th
	>
{/snippet}
{#snippet row(i: TableItem)}
	<tr>
		<td
			class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200"
			>{i.name}</td
		>
		<!-- <td
			class="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-neutral-200"
			>45</td
		>
		<td
			class="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-neutral-200"
			>New York No. 1 Lake Park</td
		>
		<td class="whitespace-nowrap px-6 py-4 text-end text-sm font-medium">
			<button
				type="button"
				class="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
				>Delete</button
			>
		</td> -->
	</tr>
{/snippet}

<div class="flex flex-col">
	<div class="-m-1.5 overflow-x-auto">
		<div class="inline-block min-w-full p-1.5 align-middle">
			<div class="overflow-hidden">
				<table
					class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
				>
					<thead>
						<tr>
							{#each headers as { label }}
								<th
									scope="col"
									class="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-500"
								>
									{label}
								</th>
							{/each}
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
						{#each tableItems as i}
							{@render row(i)}
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
