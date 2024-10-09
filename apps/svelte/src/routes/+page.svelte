<script lang="ts">
	import { onMount } from "svelte";
	import UpsertTransaction from "$lib/components/upsert-transaction.svelte";

	onMount(async () => {
		const L = await import("leaflet");

		const map = L.map("map", {
			center: L.latLng(-9.928534, -63.036131),
			zoom: 16,
		});

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);
		// Satelite tile layer
		// L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
		// 	maxZoom: 20,
		// 	subdomains: ["mt0", "mt1", "mt2", "mt3"],
		// }).addTo(map);

		// L.geoJSON(geojsonData as any).addTo(map);
	});
</script>

<svelte:head>
	<title>My Farm</title>
</svelte:head>

<section>
	<div id="map"></div>

	<UpsertTransaction />
</section>

<style>
	#map {
		height: 500px;
	}
</style>
