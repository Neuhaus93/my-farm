import { categoryTable, db } from "@my-farm/db";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = async (event) => {
	const user = event.locals.user;
	if (!user) redirect(302, "/login");

	const categories = await db
		.select()
		.from(categoryTable)
		.where(eq(categoryTable.farmId, user.farmId));

	return {
		categories,
	};
};
