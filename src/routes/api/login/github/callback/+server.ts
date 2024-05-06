import { OAuth2RequestError } from 'arctic';

import { github, lucia } from '$lib/server/auth';

import type { RequestEvent } from './$types';
import { db } from '$lib/server/db';
import { createId } from '@paralleldrive/cuid2';
import { users } from '$lib/server/db/schema';

interface GitHubUser {
	id: number;
	login: string;
}

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, { status: 400 });
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.github_id, githubUser.id)
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = createId();

			await db.insert(users).values({
				id: userId,
				github_id: githubUser.id,
				username: githubUser.login
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}

		return new Response(null, {
			status: 302,
			headers: { Location: '/' }
		});
	} catch (err: unknown) {
		if (err instanceof OAuth2RequestError) {
			return new Response(null, { status: 400 });
		}

		return new Response(null, { status: 500 });
	}
}
