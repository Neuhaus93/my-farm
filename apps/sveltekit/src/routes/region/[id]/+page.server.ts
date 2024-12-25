import { db } from '$lib/server/db';
import { redirect, error } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const load = async (event) => {
	const user = event.locals.user;
	if (!user) return redirect(302, '/login');

	const [region] = await db
		.select()
		.from(table.region)
		.where(
			and(eq(table.region.id, Number(event.params.id)), eq(table.region.farmId, user.farm.id))
		);

	if (!region) return error(404, 'Region not found');

	return {
		region
	};
};
