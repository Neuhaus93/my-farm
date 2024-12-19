import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const user = event.locals.user;
	if (!user) {
		return { user: null };
	}

	const farm = await db.select().from(table.farm).where(eq(table.farm.id, user.farm.id));
	let logoBase64 = null;
	if (farm.length > 0 && farm[0].logo) {
		logoBase64 = Buffer.from(farm[0].logo).toString('base64');
	}

	return { user: event.locals.user, logo: logoBase64 };
};
