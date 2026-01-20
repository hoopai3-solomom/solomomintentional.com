import { Link, useSearchParams } from 'react-router-dom';
import { getAllPosts, getPostsByCategory, type BlogPost } from '../content/blog/posts';
import './Blog.css';

const categoryLabels: Record<BlogPost['category'], string> = {
  fertility: 'Fertility Planning',
  donor: 'Donor Selection',
  career: 'Career & Motherhood',
  mindset: 'Mindset',
  community: 'Community',
  selfcare: 'Self Care'
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function Blog() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') as BlogPost['category'] | null;

  const posts = categoryFilter
    ? getPostsByCategory(categoryFilter)
    : getAllPosts();

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1>The Intentional Mom Blog</h1>
          <p>Insights, strategies, and encouragement for solo moms creating intentional, joy-filled lives for their families.</p>
        </div>
      </section>

      <main className="container">
        {categoryFilter && (
          <div className="category-filter-active">
            <span>Showing: {categoryLabels[categoryFilter]}</span>
            <Link to="/blog" className="clear-filter">Clear filter</Link>
          </div>
        )}

        <div className="blog-grid">
          {posts.map(post => (
            <Link to={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
              <div className="blog-card-image">
                <span>{post.emoji}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-card-header">
                  <span className={`category-badge category-${post.category}`}>
                    {categoryLabels[post.category]}
                  </span>
                  <span className="read-time">{post.readTime} min read</span>
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
                  <span className="read-more">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="no-posts">
            <p>No posts found in this category.</p>
            <Link to="/blog" className="back-link">View all posts</Link>
          </div>
        )}
      </main>
    </>
  );
}
