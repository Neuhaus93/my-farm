<script lang="ts">
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

	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">Value</span>
		</div>
		<input
			class="input"
			type="number"
			placeholder="Value"
			name="amount"
			required
		/>
	</label>

	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">Description</span>
		</div>
		<input
			class="input"
			type="text"
			placeholder="Description"
			name="description"
		/>
	</label>

	<button class="btn">Create Transaction</button>
</form>
