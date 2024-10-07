<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";

	type ButtonProps = HTMLButtonAttributes;
	let { children, class: className, ...props }: ButtonProps = $props();
</script>

<button
	class={twMerge(
		"inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
		className,
	)}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</button>
