<script lang="ts">
	import { Button, Label, Heading, Input } from 'svelte-5-ui-lib';
</script>

<svelte:head>
	<title>My Farm - Login</title>
</svelte:head>

<Heading tag="h4">Login</Heading>

<form method="POST">
	<div class="mb-6">
		<Label for="email">Email</Label>
		<Input id="email" type="email" name="email" required placeholder="Email" />
	</div>

	<Button type="submit">Continue</Button>
</form>
