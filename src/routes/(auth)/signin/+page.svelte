<script lang="ts">
	import LoginForm from './login-form.svelte';
</script>

<svelte:head>
	<title>Login | BeatHub</title>
</svelte:head>

<div class="flex h-screen gap-10">
	<div class="relative w-full">
		<enhanced:img
			src="/src/lib/assets/images/login.webp"
			alt="Login"
			class="block h-full w-full grayscale"
		/>
		<div
			class="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4"
		>
			<blockquote class="space-y-2">
				<p class="text-lg">
					"Music is the divine way to tell beautiful, poetic things to the heart."
				</p>
				<footer class="text-sm">Sofia Davis</footer>
			</blockquote>
		</div>
	</div>
	<div class="flex w-full flex-col items-center justify-center">
		<div class="lg:p-8">
			<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div class="flex flex-col space-y-2 text-center">
					<h1 class="text-2xl font-semibold tracking-tight">Login to BeatHub</h1>
					<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
				</div>
				<LoginForm />
				<p class="px-8 text-center text-sm text-muted-foreground">
					By clicking continue, you agree to our
					<a href="/terms" class="underline underline-offset-4 hover:text-primary">
						Terms of Service
					</a>
					and
					<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
						Privacy Policy
					</a>
					.
				</p>
			</div>
		</div>
	</div>
</div>
