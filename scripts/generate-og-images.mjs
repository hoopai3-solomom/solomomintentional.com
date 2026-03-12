import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OG_DIR = path.join(ROOT, 'public', 'og');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');

// Brand colors from global.css
const COLORS = {
  bg: '#FBF9F7',
  cream: '#F5F0EB',
  blush: '#E8D5D0',
  rose: '#C9A9A6',
  lavender: '#E8E4F0',
  lavenderDark: '#C9C1D9',
  text: '#3D3D3D',
  accent: '#B67B6B',
};

const WIDTH = 1200;
const HEIGHT = 630;

// Import posts dynamically
async function getPosts() {
  const postsFile = path.join(ROOT, 'src', 'content', 'blog', 'posts.ts');
  let content = fs.readFileSync(postsFile, 'utf-8');

  // Extract just the posts array data using regex
  const posts = [];
  const slugRegex = /slug:\s*'([^']+)'/g;
  const titleRegex = /title:\s*['"]([^'"]+)['"]/g;
  const imageRegex = /image:\s*'([^']+)'/g;

  let match;
  const slugs = [];
  const titles = [];
  const images = [];

  while ((match = slugRegex.exec(content)) !== null) slugs.push(match[1]);
  while ((match = titleRegex.exec(content)) !== null) titles.push(match[1]);
  while ((match = imageRegex.exec(content)) !== null) images.push(match[1]);

  // Build a map of slug index to image
  const imageMap = {};
  // Find image fields by looking at what comes before them
  const postBlocks = content.split(/\{\s*\n\s*slug:/);
  for (let i = 1; i < postBlocks.length; i++) {
    const block = postBlocks[i];
    const slugMatch = block.match(/^[^']*'([^']+)'/);
    const imgMatch = block.match(/image:\s*'([^']+)'/);
    if (slugMatch) {
      const slug = slugMatch[1];
      const img = imgMatch ? imgMatch[1] : null;
      const titleMatch = block.match(/title:\s*'([^']+)'/);
      const title = titleMatch ? titleMatch[1] : slug;
      posts.push({ slug, title, image: img });
    }
  }

  return posts;
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function generateOGImage(post, logoImg) {
  const outputPath = path.join(OG_DIR, `${post.slug}.jpg`);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`  Skipping ${post.slug} (already exists)`);
    return;
  }

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background gradient (soft brand gradient)
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, COLORS.bg);
  gradient.addColorStop(0.5, COLORS.cream);
  gradient.addColorStop(1, COLORS.lavender);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Left side: Title text (~55% of width)
  const leftWidth = WIDTH * 0.52;
  const textX = 60;
  const textMaxWidth = leftWidth - 80;

  // Title
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 38px sans-serif';
  const titleLines = wrapText(ctx, post.title, textMaxWidth);
  const lineHeight = 48;
  const titleStartY = Math.max(160, HEIGHT / 2 - (titleLines.length * lineHeight) / 2 - 20);

  for (let i = 0; i < titleLines.length; i++) {
    ctx.fillText(titleLines[i], textX, titleStartY + i * lineHeight);
  }

  // Purple accent line below title
  const accentY = titleStartY + titleLines.length * lineHeight + 16;
  ctx.fillStyle = COLORS.lavenderDark;
  ctx.fillRect(textX, accentY, 80, 4);

  // Right side: Photo in rounded rectangle (~45%)
  if (post.image) {
    const imgPath = path.join(ROOT, 'public', post.image);
    if (fs.existsSync(imgPath)) {
      try {
        const photo = await loadImage(imgPath);
        const photoX = WIDTH * 0.55;
        const photoY = 40;
        const photoW = WIDTH * 0.42;
        const photoH = HEIGHT - 100;
        const radius = 20;

        ctx.save();
        drawRoundedRect(ctx, photoX, photoY, photoW, photoH, radius);
        ctx.clip();

        // Cover-fit the image
        const imgRatio = photo.width / photo.height;
        const frameRatio = photoW / photoH;
        let sx, sy, sw, sh;
        if (imgRatio > frameRatio) {
          sh = photo.height;
          sw = photo.height * frameRatio;
          sx = (photo.width - sw) / 2;
          sy = 0;
        } else {
          sw = photo.width;
          sh = photo.width / frameRatio;
          sx = 0;
          sy = (photo.height - sh) / 2;
        }
        ctx.drawImage(photo, sx, sy, sw, sh, photoX, photoY, photoW, photoH);
        ctx.restore();

        // Rounded border
        ctx.strokeStyle = COLORS.rose;
        ctx.lineWidth = 2;
        drawRoundedRect(ctx, photoX, photoY, photoW, photoH, radius);
        ctx.stroke();
      } catch (err) {
        console.log(`  Warning: Could not load image for ${post.slug}: ${err.message}`);
      }
    }
  }

  // Bottom-left brand lockup: logo icon
  if (logoImg) {
    const logoH = 40;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    const logoX = textX;
    const logoY = HEIGHT - 60;
    ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);

    // Brand name next to logo
    ctx.fillStyle = COLORS.accent;
    ctx.font = '500 16px sans-serif';
    ctx.fillText('Solo Mom Intentional', logoX + logoW + 12, logoY + logoH / 2 + 6);
  }

  // Save as JPEG
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);
  console.log(`  Generated ${post.slug}.jpg`);
}

async function main() {
  console.log('Generating OG images...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OG_DIR)) {
    fs.mkdirSync(OG_DIR, { recursive: true });
  }

  // Load logo
  let logoImg = null;
  const logoPath = path.join(IMAGES_DIR, 'logo (2).png');
  if (fs.existsSync(logoPath)) {
    logoImg = await loadImage(logoPath);
  } else {
    console.log('Warning: Logo not found at', logoPath);
  }

  // Get all posts
  const posts = await getPosts();
  console.log(`Found ${posts.length} posts\n`);

  // Generate OG images for posts that have an image field
  let generated = 0;
  for (const post of posts) {
    if (post.image) {
      await generateOGImage(post, logoImg);
      generated++;
    }
  }

  console.log(`\nDone! Generated OG images for ${generated} posts.`);
}

main().catch(console.error);
