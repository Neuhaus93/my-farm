<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Minus from 'lucide-svelte/icons/minus';
	import Plus from 'lucide-svelte/icons/plus';
	import House from 'lucide-svelte/icons/house';
	import LogOut from 'lucide-svelte/icons/log-out';
	import Signpost from 'lucide-svelte/icons/signpost';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		logo,
		regions,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		logo: string | null;
		regions: Array<{ id: number; name: string }>;
	} = $props();

	const data: Record<
		string,
		Array<{
			title: string;
			url: string;
			icon: typeof Signpost;
			items?: Array<{
				title: string;
				url: string;
				isActive?: boolean;
			}>;
		}>
	> = {
		navMain: [
			{
				title: 'Regions',
				url: '#',
				icon: Signpost,
				items: regions.map((r) => ({
					title: r.name,
					url: `/region/${r.id}`
				}))
			}
		]
	};
</script>

<Sidebar.Root bind:ref {...restProps}>
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
			<Sidebar.Menu>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href="/" {...props}>
							<House />
							<span>Home</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
				{#each data.navMain as mainItem, index (mainItem.title)}
					<Collapsible.Root open={index === 0} class="group/collapsible">
						<Sidebar.MenuItem>
							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuButton {...props}>
										<mainItem.icon />
										{mainItem.title}{' '}
										<Plus class="ml-auto group-data-[state=open]/collapsible:hidden" />
										<Minus class="ml-auto group-data-[state=closed]/collapsible:hidden" />
									</Sidebar.MenuButton>
								{/snippet}
							</Collapsible.Trigger>
							{#if mainItem.items?.length}
								<Collapsible.Content>
									<Sidebar.MenuSub>
										{#each mainItem.items as item (item.title)}
											<Sidebar.MenuSubItem>
												<Sidebar.MenuSubButton isActive={item.isActive}>
													{#snippet child({ props })}
														<a href={item.url} {...props}>{item.title}</a>
													{/snippet}
												</Sidebar.MenuSubButton>
											</Sidebar.MenuSubItem>
										{/each}
									</Sidebar.MenuSub>
								</Collapsible.Content>
							{/if}
						</Sidebar.MenuItem>
					</Collapsible.Root>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
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
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
