import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
}

function setMetaTag(property: string, content: string, isName = false) {
  const attr = isName ? 'name' : 'property';
  let element = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function useDocumentMeta({ title, description, url, image, type = 'article' }: DocumentMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    const fullTitle = `${title} | Solo Mom Intentional`;
    document.title = fullTitle;

    const pageUrl = url || window.location.href;
    const pageImage = image || 'https://solomomintentional.com/images/LisaLogo.png';

    // Open Graph
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:url', pageUrl);
    setMetaTag('og:image', pageImage);
    setMetaTag('og:type', type);

    // Twitter Card
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', pageImage);
    setMetaTag('twitter:card', 'summary_large_image', true);

    // Standard description
    setMetaTag('description', description, true);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, url, image, type]);
}
