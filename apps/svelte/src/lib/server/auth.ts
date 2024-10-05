import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db, userTable, sessionTable } from "@my-farm/db";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			farmId: attributes.farmId,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		UserId: number;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	farmId: number;
}
