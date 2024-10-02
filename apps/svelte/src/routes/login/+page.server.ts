import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { db, userTable } from '$lib/server/db'
import { eq } from "drizzle-orm";
import { z } from 'zod';

export const load = async (event) => {
  if (!!event.locals.user) redirect(302, "/");
  return;
}

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const formEmail = formData.get("email");

    const emailSafeParse = z.string().email().safeParse(formEmail);
    if (!emailSafeParse.success) {
      return fail(400, {
        message: "Invalid email"
      });
    }


    const email = emailSafeParse.data;
    let [user] = await db.select().from(userTable).where(
      eq(userTable.email, email)
    )
    if (!user) {
      [user] = await db.insert(userTable).values({
        email,
      }).returning({ id: userTable.id, email: userTable.email })
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    redirect(302, "/");
  }
};
