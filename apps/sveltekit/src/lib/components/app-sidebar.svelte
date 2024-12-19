<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import House from 'lucide-svelte/icons/house';
	import LogOut from 'lucide-svelte/icons/log-out';

	// Menu items.
	const items = [
		{
			title: 'Home',
			url: '/',
			icon: House
		}
	];

	let { logo }: { logo: string | null } = $props();
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<div class="mt-4 flex items-center justify-center">
			<img
				alt="farm logo"
				src={logo ? `data:image/jpeg;base64,${logo}` : 'https://placehold.co/100'}
				width={92}
				height={92}
				class="overflow-hidden rounded"
			/>
		</div>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={page.route.id === item.url}>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<form method="post" action="/logout">
							<button {...props}>
								<LogOut />
								<span>Logout</span>
							</button>
						</form>
					{/snippet}</Sidebar.MenuButton
				>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
