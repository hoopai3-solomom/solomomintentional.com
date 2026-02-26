import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../content/blog/posts';

export function GET(context: APIContext) {
  const posts = getAllPosts();

  return rss({
    title: 'Solo Mom Intentional Blog',
    description: 'Insights, strategies, and encouragement for solo moms creating intentional, joy-filled lives for their families.',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.excerpt,
      link: `/blog/${post.slug}/`,
    })),
  });
}
