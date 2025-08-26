import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/guests", async (c) => {
  const { results } = await c.env.prod_d1.prepare("SELECT * FROM Guests").run();

  return c.json(results);
});

app.post("/api/guests", async (c) => {
  const body = (await c.req.json()) as { name: string; message: string };
  await c.env.prod_d1
    .prepare("INSERT INTO Guests (Name, Message) VALUES (?, ?)")
    .bind(body.name, body.message)
    .run();

  return c.json({ success: true });
});

export default app;
