import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const POST = async ({ locals, cookies }) => {
	if (locals.session) {
		await auth.invalidateSession(locals.session.id);
		cookies.delete(auth.sessionCookieName, { path: '/' });
	}

	return redirect(302, '/login');
};
