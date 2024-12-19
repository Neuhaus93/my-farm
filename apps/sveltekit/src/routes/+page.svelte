<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';

	let L: any;
	let map: any;
	onMount(async () => {
		// @ts-ignore
		L = await import('leaflet');

		map = L.map('map', {
			center: L.latLng(-9.672786, -63.1200666),
			zoom: 13
		});

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		// Satelite tile layer
		// L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
		// 	maxZoom: 20,
		// 	subdomains: ["mt0", "mt1", "mt2", "mt3"],
		// }).addTo(map);
	});

	const { form } = $props();

	$effect(() => {
		if (!!form && !!form.json && L) {
			L.geoJSON(form.json as any).addTo(map);
		}
	});
</script>

<section>
	<div id="map"></div>

	<div class="mt-10">
		<form use:enhance method="post" action="?/load-kml" enctype="multipart/form-data">
			<Label for="backup-json">Backup File</Label>
			<Input id="backup-json" type="file" class="w-full" name="file"></Input>

			<Button type="submit">Submit</Button>
		</form>
	</div>

	<div class="mt-10">
		<form use:enhance method="post" action="?/load-logo" enctype="multipart/form-data">
			<Label for="logo">Logo</Label>
			<Input id="logo" type="file" class="w-full" name="file"></Input>

			<Button type="submit">Submit</Button>
		</form>
	</div>
</section>

<style>
	#map {
		height: 500px;
		width: 500px;
	}
</style>
