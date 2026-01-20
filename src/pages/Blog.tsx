import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, BlogPost } from '../content/blog/posts';

// CSS Custom Properties (matching brand)
const cssVariables = `
  :root {
    --color-bg: #FBF9F7;
    --color-cream: #F5F0EB;
    --color-blush: #E8D5D0;
    --color-rose: #C9A9A6;
    --color-sage: #9CAF96;
    --color-sage-light: #E8EFE6;
    --color-lavender: #E8E4F0;
    --color-lavender-dark: #C9C1D9;
    --color-text: #3D3D3D;
    --color-text-light: #6B6B6B;
    --color-accent: #B67B6B;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body: 'Nunito Sans', -apple-system, sans-serif;
    --shadow-soft: 0 4px 20px rgba(0,0,0,0.06);
    --shadow-medium: 0 8px 30px rgba(0,0,0,0.08);
    --shadow-hover: 0 12px 40px rgba(0,0,0,0.12);
    --radius: 16px;
  }
`;

// Styles object for inline styling approach
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: "'Nunito Sans', -apple-system, sans-serif",
    backgroundColor: '#FBF9F7',
    minHeight: '100vh',
  },
  hero: {
    background: 'linear-gradient(135deg, #F5F0EB 0%, #E8D5D0 50%, #C9A9A6 100%)',
    padding: '80px 20px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 1,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 500,
    color: '#3D3D3D',
    marginBottom: '16px',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
    fontStyle: 'italic',
    color: '#6B6B6B',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '32px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    textDecoration: 'none',
    color: 'inherit',
  },
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover' as const,
    backgroundColor: '#E8D5D0',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '200px',
    background: 'linear-gradient(135deg, #E8D5D0 0%, #C9A9A6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '3rem',
  },
  cardContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: '#E8EFE6',
    color: '#3D3D3D',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  cardMeta: {
    fontSize: '0.85rem',
    color: '#6B6B6B',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#3D3D3D',
    marginBottom: '12px',
    lineHeight: 1.3,
  },
  cardExcerpt: {
    fontSize: '0.95rem',
    color: '#6B6B6B',
    lineHeight: 1.7,
    flex: 1,
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid #F5F0EB',
  },
  readMore: {
    color: '#B67B6B',
    fontWeight: 600,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'gap 0.3s ease',
  },
};

// Category badge colors
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

// Blog Card Component
interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const categoryStyle = categoryColors[post.category] || categoryColors['Mindset'];

  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image or Placeholder */}
      <div style={styles.cardImagePlaceholder}>
        <span role="img" aria-label="blog">📝</span>
      </div>

      <div style={styles.cardContent}>
        {/* Header with Category and Date */}
        <div style={styles.cardHeader}>
          <span
            style={{
              ...styles.categoryBadge,
              backgroundColor: categoryStyle.bg,
              color: categoryStyle.text,
            }}
          >
            {post.category}
          </span>
          <span style={styles.cardMeta}>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 style={styles.cardTitle}>{post.title}</h3>

        {/* Excerpt */}
        <p style={styles.cardExcerpt}>{post.excerpt}</p>

        {/* Footer */}
        <div style={styles.cardFooter}>
          <span style={styles.cardMeta}>{formatDate(post.date)}</span>
          <span style={styles.readMore}>
            Read More
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// Main Blog Page Component
export default function Blog() {
  const posts = getAllPosts();

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>The Intentional Mom Blog</h1>
          <p style={styles.heroSubtitle}>
            Insights, strategies, and encouragement for solo moms creating
            intentional, joy-filled lives for their families.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main style={styles.container}>
        <div style={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Export styles for use in other components if needed
export { styles as blogStyles, categoryColors, formatDate };
