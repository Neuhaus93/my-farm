<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { page } from "$app/stores";
	type SidebarItem = {
		label: string;
		href: string;
		selected: boolean;
	};
	let sidebarItems: SidebarItem[] = $state([
		{ label: "Dashboard", href: "/", selected: true },
		{ label: "Categories", href: "/categories", selected: false },
	]);
	page.subscribe((value) => {
		sidebarItems = sidebarItems.map((i) => ({
			...i,
			selected: value.route.id === i.href,
		}));
	});
</script>

{#snippet item({ label, href, selected }: SidebarItem)}
	<li>
		<a
			class={twMerge(
				"flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100",
				selected
					? "bg-gray-100 dark:bg-neutral-700 dark:text-white"
					: "dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300",
			)}
			{href}
		>
			<svg
				class="size-4"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
					points="9 22 9 12 15 12 15 22"
				/></svg
			>
			{label}
		</a>
	</li>
{/snippet}

<div
	id="hs-offcanvas-example"
	class="hs-overlay hs-overlay-open:translate-x-0 fixed bottom-0 start-0 top-0 z-[60] hidden w-64 -translate-x-full transform overflow-y-auto border-e border-gray-200 bg-white pb-10 pt-7 transition-all duration-300 [--auto-close:lg] lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2"
	role="dialog"
	tabindex="-1"
	aria-label="Sidebar"
>
	<div class="px-6">
		<a
			class="flex-none text-xl font-semibold text-black focus:opacity-80 focus:outline-none dark:text-white"
			href="/"
			aria-label="Brand">Brand</a
		>
	</div>
	<nav
		class="hs-accordion-group flex w-full flex-col flex-wrap p-6"
		data-hs-accordion-always-open
	>
		<ul class="space-y-1.5">
			{#each sidebarItems as i}
				{@render item(i)}
			{/each}

			<li>
				<a
					class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
					href="/categories"
				>
					<svg
						class="size-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path
							d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
						/></svg
					>
					Categories
				</a>
			</li>

			<li class="hs-accordion" id="users-accordion">
				<button
					type="button"
					class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:hs-accordion-active:text-white flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
					aria-expanded="true"
					aria-controls="users-accordion"
				>
					<svg
						class="size-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle
							cx="9"
							cy="7"
							r="4"
						/><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path
							d="M16 3.13a4 4 0 0 1 0 7.75"
						/></svg
					>
					Users

					<svg
						class="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg
					>

					<svg
						class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
					>
				</button>

				<div
					id="users-accordion"
					class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
					role="region"
					aria-labelledby="users-accordion"
				>
					<ul
						class="hs-accordion-group ps-3 pt-2"
						data-hs-accordion-always-open
					>
						<li class="hs-accordion" id="users-accordion-sub-1">
							<button
								type="button"
								class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:hs-accordion-active:text-white flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
								aria-expanded="true"
								aria-controls="users-accordion-sub-1"
							>
								Sub Menu 1

								<svg
									class="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg
								>

								<svg
									class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
								>
							</button>

							<div
								id="users-accordion-sub-1"
								class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
								role="region"
								aria-labelledby="users-accordion-sub-1"
							>
								<ul class="ps-2 pt-2">
									<li>
										<a
											class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
											href="/"
										>
											Link 1
										</a>
									</li>
									<li>
										<a
											class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
											href="/"
										>
											Link 2
										</a>
									</li>
									<li>
										<a
											class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
											href="/"
										>
											Link 3
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li class="hs-accordion" id="users-accordion-sub-2">
							<button
								type="button"
								class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:hs-accordion-active:text-white flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
								aria-expanded="true"
								aria-controls="users-accordion-sub-2"
							>
								Sub Menu 2

								<svg
									class="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg
								>

								<svg
									class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
								>
							</button>

							<div
								id="users-accordion-sub-2"
								class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
								role="region"
								aria-labelledby="users-accordion-sub-2"
							>
								<ul class="ps-2 pt-2">
									<li>
										<a
											class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
											href="/"
										>
											Link 1
										</a>
									</li>
									<li>
										<a
											class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
											href="/"
										>
											Link 2
										</a>
									</li>
									<li>
										<a
											class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
											href="/"
										>
											Link 3
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</li>

			<li class="hs-accordion" id="account-accordion">
				<button
					type="button"
					class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:hs-accordion-active:text-white flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
					aria-expanded="true"
					aria-controls="account-accordion"
				>
					<svg
						class="size-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><circle cx="18" cy="15" r="3" /><circle cx="9" cy="7" r="4" /><path
							d="M10 15H6a4 4 0 0 0-4 4v2"
						/><path d="m21.7 16.4-.9-.3" /><path d="m15.2 13.9-.9-.3" /><path
							d="m16.6 18.7.3-.9"
						/><path d="m19.1 12.2.3-.9" /><path d="m19.6 18.7-.4-1" /><path
							d="m16.8 12.3-.4-1"
						/><path d="m14.3 16.6 1-.4" /><path d="m20.7 13.8 1-.4" /></svg
					>
					Account

					<svg
						class="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg
					>

					<svg
						class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
					>
				</button>

				<div
					id="account-accordion"
					class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
					role="region"
					aria-labelledby="account-accordion"
				>
					<ul class="ps-2 pt-2">
						<li>
							<a
								class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
								href="/"
							>
								Link 1
							</a>
						</li>
						<li>
							<a
								class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
								href="/"
							>
								Link 2
							</a>
						</li>
						<li>
							<a
								class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
								href="/"
							>
								Link 3
							</a>
						</li>
					</ul>
				</div>
			</li>

			<li class="hs-accordion" id="projects-accordion">
				<button
					type="button"
					class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:hs-accordion-active:text-white flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
					aria-expanded="true"
					aria-controls="projects-accordion"
				>
					<svg
						class="size-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"
						/><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" /><path
							d="M15 2v5h5"
						/></svg
					>
					Projects

					<svg
						class="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg
					>

					<svg
						class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
					>
				</button>

				<div
					id="projects-accordion"
					class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
					role="region"
					aria-labelledby="projects-accordion"
				>
					<ul class="ps-2 pt-2">
						<li>
							<a
								class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
								href="/"
							>
								Link 1
							</a>
						</li>
						<li>
							<a
								class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
								href="/"
							>
								Link 2
							</a>
						</li>
						<li>
							<a
								class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
								href="/"
							>
								Link 3
							</a>
						</li>
					</ul>
				</div>
			</li>

			<li>
				<a
					class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
					href="/"
				>
					<svg
						class="size-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line
							x1="16"
							x2="16"
							y1="2"
							y2="6"
						/><line x1="8" x2="8" y1="2" y2="6" /><line
							x1="3"
							x2="21"
							y1="10"
							y2="10"
						/><path d="M8 14h.01" /><path d="M12 14h.01" /><path
							d="M16 14h.01"
						/><path d="M8 18h.01" /><path d="M12 18h.01" /><path
							d="M16 18h.01"
						/></svg
					>
					Calendar
				</a>
			</li>
			<li>
				<a
					class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
					href="/"
				>
					<svg
						class="size-4"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path
							d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
						/></svg
					>
					Documentation
				</a>
			</li>
		</ul>
	</nav>
</div>
