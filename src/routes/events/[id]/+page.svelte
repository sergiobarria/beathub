<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold tracking-wide">Event Details</h1>

<pre>
    {JSON.stringify(data, null, 2)}
</pre>
