import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, BlogPost as BlogPostType } from '../content/blog/posts';

// Simple Markdown Parser Component
function MarkdownRenderer({ content }: { content: string }) {
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let blockquoteLines: string[] = [];

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag key={`list-${elements.length}`} style={styles.list}>
            {listItems.map((item, i) => (
              <li key={i} style={styles.listItem}>{parseInline(item)}</li>
            ))}
          </ListTag>
        );
        listItems = [];
        listType = null;
      }
    };

    const flushBlockquote = () => {
      if (blockquoteLines.length > 0) {
        elements.push(
          <blockquote key={`quote-${elements.length}`} style={styles.blockquote}>
            {blockquoteLines.map((line, i) => (
              <p key={i}>{parseInline(line)}</p>
            ))}
          </blockquote>
        );
        blockquoteLines = [];
      }
    };

    const parseInline = (text: string): React.ReactNode => {
      // Handle bold, italic, and links
      const parts: React.ReactNode[] = [];
      let remaining = text;
      let key = 0;

      while (remaining.length > 0) {
        // Bold **text**
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        // Italic *text* or _text_
        const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)|_([^_]+)_/);
        // Links [text](url)
        const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

        const matches = [
          { match: boldMatch, type: 'bold' },
          { match: italicMatch, type: 'italic' },
          { match: linkMatch, type: 'link' },
        ].filter(m => m.match !== null)
         .sort((a, b) => (a.match?.index || 0) - (b.match?.index || 0));

        if (matches.length === 0) {
          parts.push(remaining);
          break;
        }

        const first = matches[0];
        const match = first.match!;
        const index = match.index || 0;

        if (index > 0) {
          parts.push(remaining.slice(0, index));
        }

        if (first.type === 'bold') {
          parts.push(<strong key={key++}>{match[1]}</strong>);
          remaining = remaining.slice(index + match[0].length);
        } else if (first.type === 'italic') {
          parts.push(<em key={key++}>{match[1] || match[2]}</em>);
          remaining = remaining.slice(index + match[0].length);
        } else if (first.type === 'link') {
          parts.push(
            <a key={key++} href={match[2]} style={styles.link} target="_blank" rel="noopener noreferrer">
              {match[1]}
            </a>
          );
          remaining = remaining.slice(index + match[0].length);
        }
      }

      return parts.length === 1 ? parts[0] : parts;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // H1
      if (line.startsWith('# ')) {
        flushList();
        flushBlockquote();
        elements.push(
          <h1 key={`h1-${i}`} style={styles.h1}>{parseInline(line.slice(2))}</h1>
        );
        continue;
      }

      // H2
      if (line.startsWith('## ')) {
        flushList();
        flushBlockquote();
        elements.push(
          <h2 key={`h2-${i}`} style={styles.h2}>{parseInline(line.slice(3))}</h2>
        );
        continue;
      }

      // H3
      if (line.startsWith('### ')) {
        flushList();
        flushBlockquote();
        elements.push(
          <h3 key={`h3-${i}`} style={styles.h3}>{parseInline(line.slice(4))}</h3>
        );
        continue;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        flushList();
        blockquoteLines.push(line.slice(2));
        continue;
      } else {
        flushBlockquote();
      }

      // Unordered list
      if (line.match(/^[-*] /)) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        listItems.push(line.slice(2));
        continue;
      }

      // Ordered list
      if (line.match(/^\d+\. /)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        listItems.push(line.replace(/^\d+\. /, ''));
        continue;
      }

      // Horizontal rule
      if (line.match(/^---+$/)) {
        flushList();
        elements.push(<hr key={`hr-${i}`} style={styles.hr} />);
        continue;
      }

      // Empty line
      if (line.trim() === '') {
        flushList();
        continue;
      }

      // Regular paragraph
      flushList();
      elements.push(
        <p key={`p-${i}`} style={styles.paragraph}>{parseInline(line)}</p>
      );
    }

    flushList();
    flushBlockquote();

    return elements;
  };

  return <div style={styles.content}>{parseMarkdown(content)}</div>;
}

// Social Share Buttons Component
interface ShareButtonsProps {
  url: string;
  title: string;
}

function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div style={styles.shareContainer}>
      <span style={styles.shareLabel}>Share this article:</span>
      <div style={styles.shareButtons}>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.shareButton}
          aria-label="Share on Facebook"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.shareButton}
          aria-label="Share on X/Twitter"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.shareButton}
          aria-label="Share on LinkedIn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <button
          onClick={copyToClipboard}
          style={styles.shareButton}
          aria-label="Copy link"
        >
          {copied ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// 404 Not Found Component
function NotFound() {
  return (
    <div style={styles.notFoundPage}>
      <div style={styles.notFoundContent}>
        <h1 style={styles.notFoundTitle}>Post Not Found</h1>
        <p style={styles.notFoundText}>
          Sorry, the blog post you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/blog" style={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}

// Category badge colors (matching Blog.tsx)
const categoryColors: { [key: string]: { bg: string; text: string } } = {
  'Mindset': { bg: '#E8E4F0', text: '#3D3D3D' },
  'Community': { bg: '#E8EFE6', text: '#3D3D3D' },
  'Self-Care': { bg: '#E8D5D0', text: '#3D3D3D' },
  'Finance': { bg: '#F5F0EB', text: '#3D3D3D' },
  'Family Life': { bg: '#C9C1D9', text: '#3D3D3D' },
  'Co-Parenting': { bg: '#C9A9A6', text: '#FFFFFF' },
};

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: "'Nunito Sans', -apple-system, sans-serif",
    backgroundColor: '#FBF9F7',
    minHeight: '100vh',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    marginBottom: '24px',
    opacity: 0.9,
    transition: 'opacity 0.3s ease',
  },
  hero: {
    background: 'linear-gradient(135deg, #F5F0EB 0%, #E8D5D0 50%, #C9A9A6 100%)',
    padding: '60px 20px 80px',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '20px',
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 500,
    color: '#3D3D3D',
    marginBottom: '20px',
    lineHeight: 1.2,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: '#6B6B6B',
    fontSize: '0.95rem',
  },
  metaDivider: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#6B6B6B',
  },
  imageContainer: {
    maxWidth: '900px',
    margin: '-40px auto 0',
    padding: '0 20px',
  },
  featuredImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover' as const,
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
  },
  imagePlaceholder: {
    width: '100%',
    height: '400px',
    background: 'linear-gradient(135deg, #E8D5D0 0%, #C9A9A6 50%, #9CAF96 100%)',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '4rem',
  },
  article: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '60px 20px',
  },
  content: {
    color: '#3D3D3D',
    lineHeight: 1.8,
  },
  h1: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2.5rem',
    fontWeight: 600,
    color: '#3D3D3D',
    marginTop: '48px',
    marginBottom: '24px',
    lineHeight: 1.3,
  },
  h2: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.875rem',
    fontWeight: 600,
    color: '#3D3D3D',
    marginTop: '40px',
    marginBottom: '20px',
    lineHeight: 1.3,
  },
  h3: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#3D3D3D',
    marginTop: '32px',
    marginBottom: '16px',
    lineHeight: 1.4,
  },
  paragraph: {
    fontSize: '1.1rem',
    marginBottom: '24px',
    color: '#3D3D3D',
  },
  list: {
    marginBottom: '24px',
    paddingLeft: '24px',
  },
  listItem: {
    fontSize: '1.1rem',
    marginBottom: '12px',
    color: '#3D3D3D',
  },
  blockquote: {
    borderLeft: '4px solid #B67B6B',
    margin: '32px 0',
    padding: '20px 24px',
    backgroundColor: '#F5F0EB',
    borderRadius: '0 16px 16px 0',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.25rem',
    fontStyle: 'italic',
    color: '#6B6B6B',
  },
  hr: {
    border: 'none',
    height: '1px',
    backgroundColor: '#E8D5D0',
    margin: '40px 0',
  },
  link: {
    color: '#B67B6B',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  shareContainer: {
    borderTop: '1px solid #E8D5D0',
    paddingTop: '32px',
    marginTop: '48px',
  },
  shareLabel: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#3D3D3D',
    marginBottom: '16px',
  },
  shareButtons: {
    display: 'flex',
    gap: '12px',
  },
  shareButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#F5F0EB',
    color: '#3D3D3D',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  footer: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 20px 60px',
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    backgroundColor: '#FFFFFF',
    color: '#B67B6B',
    border: '2px solid #B67B6B',
    borderRadius: '30px',
    fontSize: '0.95rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  notFoundPage: {
    fontFamily: "'Nunito Sans', -apple-system, sans-serif",
    backgroundColor: '#FBF9F7',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  notFoundContent: {
    textAlign: 'center' as const,
    maxWidth: '500px',
  },
  notFoundTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '2.5rem',
    fontWeight: 500,
    color: '#3D3D3D',
    marginBottom: '16px',
  },
  notFoundText: {
    fontSize: '1.1rem',
    color: '#6B6B6B',
    marginBottom: '32px',
    lineHeight: 1.7,
  },
};

// Main BlogPost Component
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // Generate the current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (!post) {
    return <NotFound />;
  }

  const categoryStyle = categoryColors[post.category] || categoryColors['Mindset'];

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <Link to="/blog" style={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog
          </Link>

          <span
            style={{
              ...styles.categoryBadge,
              backgroundColor: categoryStyle.bg,
              color: categoryStyle.text,
            }}
          >
            {post.category}
          </span>

          <h1 style={styles.title}>{post.title}</h1>

          <div style={styles.meta}>
            <span>{formatDate(post.date)}</span>
            <span style={styles.metaDivider}></span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div style={styles.imageContainer}>
        <div style={styles.imagePlaceholder}>
          <span role="img" aria-label="blog post">📖</span>
        </div>
      </div>

      {/* Article Content */}
      <article style={styles.article}>
        <MarkdownRenderer content={post.content} />

        {/* Social Share */}
        <ShareButtons url={currentUrl} title={post.title} />
      </article>

      {/* Footer with Back Link */}
      <footer style={styles.footer}>
        <Link to="/blog" style={styles.backButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Blog
        </Link>
      </footer>
    </div>
  );
}
