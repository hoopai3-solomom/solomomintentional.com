import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, type BlogPost as BlogPostType } from '../content/blog/posts';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import './BlogPost.css';

const categoryLabels: Record<BlogPostType['category'], string> = {
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

function renderMarkdown(content: string): string {
  let html = content;

  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (_match, content) => {
    const cells = content.split('|').map((cell: string) => cell.trim());
    const isHeader = cells.some((cell: string) => cell.includes('---'));
    if (isHeader) return '';
    const cellTag = 'td';
    const cellsHtml = cells.map((cell: string) => `<${cellTag}>${cell}</${cellTag}>`).join('');
    return `<tr>${cellsHtml}</tr>`;
  });

  // Wrap tables
  const tableRegex = /(<tr>[\s\S]*?<\/tr>)+/g;
  html = html.replace(tableRegex, '<table>$&</table>');

  // Unordered lists
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Numbered lists
  html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');

  // Paragraphs (simplified - wrap text blocks not already wrapped)
  const lines = html.split('\n\n');
  html = lines.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return trimmed;
    return `<p>${trimmed}</p>`;
  }).join('\n');

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useDocumentMeta({
    title: post?.title ?? 'Post Not Found',
    description: post?.excerpt ?? 'The blog post you are looking for could not be found.',
    url: post ? `https://solomomintentional.com/blog/${post.slug}` : undefined,
  });

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h1>Post Not Found</h1>
        <p>Sorry, we couldn't find the blog post you're looking for.</p>
        <Link to="/blog" className="back-to-blog">Back to Blog</Link>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <>
      <article className="blog-post">
        <header className="blog-post-header">
          <Link to="/blog" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog
          </Link>

          <div className="blog-post-meta">
            <span className={`category-badge category-${post.category}`}>
              {categoryLabels[post.category]}
            </span>
            <span className="meta-separator">•</span>
            <span className="post-date">{formatDate(post.publishedAt)}</span>
            <span className="meta-separator">•</span>
            <span className="post-read-time">{post.readTime} min read</span>
          </div>

          <h1>{post.title}</h1>
          <p className="blog-post-excerpt">{post.excerpt}</p>
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        <footer className="blog-post-footer">
          <div className="share-section">
            <span className="share-label">Share this article:</span>
            <div className="share-buttons">
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-button"
                aria-label="Share on Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-button"
                aria-label="Share on Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-button"
                aria-label="Share on LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="share-button"
                aria-label="Copy link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="cta-section">
            <h3>Ready to Start Your Journey?</h3>
            <p>Book a 30-minute session to get personalized guidance and support on your path to solo motherhood.</p>
            <Link to="/book" className="cta-button">Book Your Session</Link>
          </div>
        </footer>
      </article>
    </>
  );
}
