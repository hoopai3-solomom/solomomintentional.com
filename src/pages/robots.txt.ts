import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  const sitemapUrl = new URL('/sitemap-index.xml', context.site);

  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
