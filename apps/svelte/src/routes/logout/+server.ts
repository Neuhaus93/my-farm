import { lucia } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const GET = async (event) => {
	if (!event.locals.session) {
		return redirect(302, "/login");
	}
	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes,
	});
	return redirect(302, "/login");
};

export const POST = async (event) => {
	if (!event.locals.session) {
		return redirect(302, "/login");
	}
	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes,
	});
	return redirect(302, "/login");
};
