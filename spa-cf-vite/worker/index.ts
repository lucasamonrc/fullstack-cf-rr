import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { guestsTable } from "../db/schema";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/guests", async (c) => {
	const db = drizzle(c.env.prod_d1);

	const result = await db.select().from(guestsTable).all();

	return c.json(result);
});

app.post("/api/guests", async (c) => {
	const db = drizzle(c.env.prod_d1);

	const body = (await c.req.json()) as { name: string; message: string };

	const result = await db
		.insert(guestsTable)
		.values(body)
		.returning({ id: guestsTable.id });

	return c.json(result);
});

export default app;
