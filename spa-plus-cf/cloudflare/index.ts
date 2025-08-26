export default {
  async fetch(request): Promise<Response> {
    const url = new URL(request.url);
    console.log("hi");
    if (url.pathname.startsWith("/api")) {
      return Response.json({
        name: "Cloudflare",
      });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
