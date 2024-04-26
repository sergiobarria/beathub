<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: console.log('PAGE DATA', data);
</script>

<svelte:head>
	<title>Events | DJ Block</title>
</svelte:head>

<div>Events page</div>
