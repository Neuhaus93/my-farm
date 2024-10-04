<script lang="ts">
	import { Button, Heading } from 'svelte-5-ui-lib';

	let { data } = $props();
</script>

<svelte:head>
	<title>My Farm</title>
</svelte:head>

<section>
	<Heading tag="h3" class="mb-6">Welcome {data.user.email}</Heading>

	<form method="post">
		<Button type="submit">Sign Out</Button>
	</form>
</section>
