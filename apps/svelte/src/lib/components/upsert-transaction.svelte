<script lang="ts">
	import { Button } from "@my-farm/ui";
	let categories = [
		{ value: 1, name: "First" },
		{ value: 2, name: "Second" },
	];
</script>

<form method="post">
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">Select Category</span>
		</div>
		<select class="select select-bordered">
			<option disabled selected>Pick one</option>
			{#each categories as category (category.value)}
				<option value={category.value}>{category.name}</option>
			{/each}
		</select>
	</label>

	<div class="max-w-sm">
		<label
			for="input-amount"
			class="mb-2 block text-sm font-medium dark:text-white">Amount</label
		>
		<input
			type="number"
			id="input-amount"
			name="amount"
			class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
			placeholder="R$ 0,00"
		/>
	</div>

	<div class="max-w-sm">
		<label
			for="input-description"
			class="mb-2 block text-sm font-medium dark:text-white">Description</label
		>
		<input
			type="text"
			id="input-description"
			name="description"
			class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
			placeholder="Description"
		/>
	</div>

	<Button>Create Transaction</Button>
</form>
