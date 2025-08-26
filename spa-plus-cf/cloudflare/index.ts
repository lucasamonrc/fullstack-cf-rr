export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/guests") && request.method === "GET") {
      const { results } = await env.prod_d1
        .prepare("SELECT * FROM Guests")
        .run();

      return Response.json(results);
    }

    if (url.pathname.startsWith("/api/guests") && request.method === "POST") {
      const body = (await request.json()) as { name: string; message: string };
      await env.prod_d1
        .prepare("INSERT INTO Guests (Name, Message) VALUES (?, ?)")
        .bind(body.name, body.message)
        .run();

      return Response.json({ success: true });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
