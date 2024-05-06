<script lang="ts">
	import { GithubIcon } from 'lucide-svelte';

	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="grid gap-6">
	<Button href="/api/login/github" class="bg-gray-600 hover:bg-gray-400">
		<GithubIcon class="mr-2 size-4" />
		Sign in with GitHub
	</Button>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
		</div>
	</div>
	<!-- TODO: Add Credentials option -->
	<div class="text-center italic text-muted-foreground">Sign in with credentials (coming soon)</div>
</div>
