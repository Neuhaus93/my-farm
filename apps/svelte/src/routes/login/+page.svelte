<script lang="ts">
	import Button from "$lib/ui/button/button.svelte";
</script>

<svelte:head>
	<title>My Farm - Login</title>
</svelte:head>

<h4>Login</h4>

<form method="POST">
	<div class="mb-6">
		<label for="email">Email</label>
		<input id="email" type="email" name="email" required placeholder="Email" />
	</div>

	<Button />
</form>
