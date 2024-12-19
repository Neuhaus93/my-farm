import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { kml } from '@tmcw/togeojson';
import { eq } from 'drizzle-orm';
import { DOMParser } from 'xmldom';

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
};

export const actions = {
	'load-kml': async (event) => {
		const user = event.locals.user;
		if (!user) return error(401, 'Unauthorized');

		const formData = await event.request.formData();
		const file = formData.get('file');

		if (!(file instanceof File) || file.type !== 'application/vnd.google-earth.kml+xml') {
			return error(400, 'Invalid file type');
		}

		const fileContent = await file.text();
		const content = new DOMParser().parseFromString(fileContent, 'utf8');

		return {
			json: kml(content)
		};
	},
	'load-logo': async (event) => {
		const user = event.locals.user;
		if (!user) return error(401, 'Unauthorized');

		const formData = await event.request.formData();
		const file = formData.get('file');

		if (!(file instanceof File)) {
			return error(400, 'Invalid file type');
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		try {
			const res = await db
				.update(table.farm)
				.set({ logo: buffer })
				.where(eq(table.farm.id, user.farm.id))
				.returning({ id: table.farm.id });
			if (res.length === 0) throw Error();
		} catch (err) {
			console.error(err);
			return error(500, 'Error saving image');
		}

		return {
			status: true,
			body: {
				message: 'File uploaded successfully'
			}
		};
	}
};
