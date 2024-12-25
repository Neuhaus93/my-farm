import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, getTableColumns } from 'drizzle-orm';

export const load = async (event) => {
	const user = event.locals.user;
	if (!user) {
		return { user: null };
	}

	const farm = await db
		.select({
			logo: table.farm.logo,
			region: getTableColumns(table.region)
		})
		.from(table.farm)
		.leftJoin(table.region, eq(table.region.farmId, table.farm.id))
		.where(eq(table.farm.id, user.farm.id));

	let logoBase64 = null;
	if (farm.length > 0 && farm[0].logo) {
		logoBase64 = Buffer.from(farm[0].logo).toString('base64');
	}

	return {
		user: event.locals.user,
		logo: logoBase64,
		regions: farm.map((f) => f.region).filter((r) => r !== null)
	};
};
