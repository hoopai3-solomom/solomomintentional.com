// Blog Post Interface
export interface BlogPost {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD format
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  content: string; // Markdown string
}

// Blog Posts Data
export const blogPosts: BlogPost[] = [
  {
    slug: 'embracing-intentional-solo-parenting',
    title: 'Embracing Intentional Solo Parenting: Your Journey Starts Here',
    date: '2026-01-15',
    readTime: '5 min read',
    category: 'Mindset',
    image: '/images/blog/intentional-parenting.jpg',
    excerpt: 'Discover how shifting your mindset from survival mode to intentional living can transform your experience as a solo mom.',
    content: `
# Embracing Intentional Solo Parenting: Your Journey Starts Here

Being a solo mom isn't just about getting through each day—it's about creating a life filled with purpose, joy, and meaningful connections with your children.

## What Does Intentional Parenting Mean?

Intentional parenting is about making conscious choices that align with your values and the life you want to build for your family. It's moving from reactive to proactive, from surviving to thriving.

### Key Principles of Intentional Solo Parenting

1. **Define Your Values** - What matters most to you and your family?
2. **Set Clear Intentions** - Start each day with purpose
3. **Create Meaningful Rituals** - Build connection through consistency
4. **Practice Self-Compassion** - You're doing better than you think

## Taking the First Step

The journey of a thousand miles begins with a single step. Today, I invite you to pause and ask yourself: *What kind of home do I want to create for my children?*

> "You don't have to be perfect to be an intentional parent. You just have to be present."

Remember, intentional parenting isn't about doing more—it's about doing what matters with awareness and love.
    `.trim(),
  },
  {
    slug: 'building-your-support-network',
    title: 'Building Your Support Network as a Solo Mom',
    date: '2026-01-08',
    readTime: '7 min read',
    category: 'Community',
    image: '/images/blog/support-network.jpg',
    excerpt: 'Learn practical strategies for creating a strong support system that helps you and your children thrive.',
    content: `
# Building Your Support Network as a Solo Mom

One of the biggest challenges solo moms face is the feeling of isolation. But here's the truth: you don't have to do this alone.

## Why Community Matters

Research shows that solo parents with strong support networks experience:
- Lower stress levels
- Better mental health
- More resilient children
- Greater life satisfaction

## Types of Support to Cultivate

### Emotional Support
Friends and family who listen without judgment and celebrate your wins.

### Practical Support
People who can help with childcare, errands, or emergencies.

### Professional Support
Coaches, therapists, and mentors who guide your personal growth.

### Community Support
Groups of people who understand your journey because they're on it too.

## Practical Steps to Build Your Network

1. **Start with who you have** - Strengthen existing relationships
2. **Join local groups** - Look for solo parent meetups
3. **Connect online** - Find supportive communities
4. **Ask for help** - It's a strength, not a weakness
5. **Give back** - Supporting others builds reciprocal relationships

Remember: Building community takes time. Start small, be consistent, and watch your network grow.
    `.trim(),
  },
  {
    slug: 'self-care-strategies-busy-moms',
    title: 'Self-Care Strategies That Actually Work for Busy Solo Moms',
    date: '2025-12-28',
    readTime: '6 min read',
    category: 'Self-Care',
    image: '/images/blog/self-care.jpg',
    excerpt: 'Forget bubble baths—these realistic self-care practices fit into your busy schedule and make a real difference.',
    content: `
# Self-Care Strategies That Actually Work for Busy Solo Moms

Let's be honest: as a solo mom, you probably rolled your eyes at the last "self-care" article that suggested a spa day. When do you have time for that?

## Redefining Self-Care

Self-care isn't about luxury—it's about sustainability. It's the daily practices that keep you functioning at your best so you can show up for your kids.

## Micro Self-Care Moments

### 5-Minute Practices
- Deep breathing while kids are occupied
- Stretching during cartoon time
- Savoring your morning coffee mindfully

### 15-Minute Resets
- Quick walk around the block
- Journaling three things you're grateful for
- A short meditation or prayer

### Weekly Non-Negotiables
- One activity just for you
- Connection with a friend (even by text)
- Something that makes you laugh

## The Permission Slip You Need

You have permission to:
- Rest without guilt
- Say no to things that drain you
- Ask for help when you need it
- Prioritize your wellbeing

> "You cannot pour from an empty cup. Taking care of yourself isn't selfish—it's necessary."

## Creating Your Self-Care Plan

1. Identify what truly refreshes you
2. Schedule it like an important appointment
3. Start with just one new practice
4. Build from there

Your children learn self-care by watching you practice it. Model the balance you want them to have.
    `.trim(),
  },
  {
    slug: 'financial-wellness-solo-moms',
    title: 'Financial Wellness: Taking Control of Your Money Story',
    date: '2025-12-15',
    readTime: '8 min read',
    category: 'Finance',
    image: '/images/blog/financial-wellness.jpg',
    excerpt: 'Practical financial strategies and mindset shifts to help you build security and confidence as a solo parent.',
    content: `
# Financial Wellness: Taking Control of Your Money Story

Money stress is real for solo moms. But financial wellness isn't just about how much you have—it's about how you relate to what you have.

## Shifting Your Money Mindset

Before we talk strategy, let's address mindset. Many solo moms carry shame or fear around money. It's time to release that.

### Affirmations for Financial Wellness
- I am capable of managing my finances
- I create security for my family
- I am worthy of financial peace
- Every small step matters

## Practical Strategies

### Track Everything
You can't improve what you don't measure. Start with awareness.

### Build Your Buffer
Even $500 can provide peace of mind. Start where you are.

### Reduce Decision Fatigue
Automate what you can—savings, bills, investments.

### Increase Your Value
Invest in skills that increase your earning potential.

## Resources for Solo Moms

- Local assistance programs
- Community resources
- Financial literacy classes
- Coaching and support groups

## Your Money Story

What narrative do you tell yourself about money? Is it serving you?

Consider rewriting your story:
- From: "I'll never have enough"
- To: "I'm building security one day at a time"

Financial wellness is a journey. Be patient with yourself, celebrate small wins, and keep moving forward.
    `.trim(),
  },
  {
    slug: 'creating-meaningful-traditions',
    title: 'Creating Meaningful Family Traditions on a Solo Mom Budget',
    date: '2025-12-01',
    readTime: '5 min read',
    category: 'Family Life',
    image: '/images/blog/family-traditions.jpg',
    excerpt: 'Discover how to build lasting memories and strong bonds with your children through simple, meaningful traditions.',
    content: `
# Creating Meaningful Family Traditions on a Solo Mom Budget

Some of the most cherished family traditions cost nothing at all. It's not about what you spend—it's about the intention behind it.

## Why Traditions Matter

Family traditions:
- Create a sense of belonging
- Build emotional security
- Strengthen family identity
- Create lasting memories

## Simple Tradition Ideas

### Daily Rituals
- Morning affirmations together
- Gratitude at dinner
- Bedtime story or reflection
- Weekly movie night with popcorn

### Seasonal Celebrations
- First day of each season nature walk
- Birthday breakfast in bed tradition
- New Year's vision board making
- Summer solstice picnic

### Special Occasion Markers
- Annual photo in the same spot
- Time capsule additions
- Memory jar contributions
- Milestone celebrations

## Making Traditions Your Own

The best traditions are ones that:
1. **Fit your family's interests** - What do you all enjoy?
2. **Are sustainable** - Can you actually do this regularly?
3. **Allow for flexibility** - Traditions can evolve
4. **Create connection** - The goal is togetherness

## Starting Your Tradition Today

Pick one small tradition to start this week. It doesn't have to be elaborate. Maybe it's:
- Taco Tuesday
- Sunday morning dance party
- Friday night gratitude sharing

> "The magic isn't in the activity—it's in the consistency and love you bring to it."

What tradition will you create with your family?
    `.trim(),
  },
  {
    slug: 'navigating-co-parenting-challenges',
    title: 'Navigating Co-Parenting Challenges with Grace',
    date: '2025-11-18',
    readTime: '7 min read',
    category: 'Co-Parenting',
    image: '/images/blog/co-parenting.jpg',
    excerpt: 'Strategies for maintaining peace and prioritizing your children\'s wellbeing in co-parenting situations.',
    content: `
# Navigating Co-Parenting Challenges with Grace

Co-parenting isn't always easy, but with the right mindset and tools, you can create a peaceful environment for your children to thrive.

## The Foundation: Your Children's Wellbeing

Every co-parenting decision should pass through this filter: *What's best for my children?*

This doesn't mean:
- Sacrificing your boundaries
- Accepting disrespect
- Agreeing with everything

It does mean:
- Keeping adult conflicts away from kids
- Supporting their relationship with both parents
- Communicating respectfully when possible

## Communication Strategies

### Keep It Brief
Stick to logistics and child-related topics.

### Keep It Informative
Share relevant information about the kids.

### Keep It Friendly
A neutral, professional tone works best.

### Keep It Firm
Maintain your boundaries consistently.

## Managing Difficult Emotions

It's normal to feel frustrated, hurt, or angry. What matters is how you handle those feelings:

1. **Process privately** - Vent to friends, not your kids
2. **Take breaks** - Step away before responding when upset
3. **Focus on what you can control** - Your reactions, your home, your choices
4. **Seek support** - Therapy or coaching can help

## When Co-Parenting Is High-Conflict

Sometimes, despite your best efforts, conflict continues. In these cases:
- Document everything
- Use written communication
- Consider a parenting coordinator
- Prioritize parallel parenting over co-parenting

## Finding Peace

You may not be able to change your co-parent, but you can:
- Control your responses
- Create peace in your home
- Model healthy relationships for your children
- Focus on being the best parent you can be

Your children don't need perfect co-parenting. They need to see you handling challenges with grace.
    `.trim(),
  },
];

// Helper Functions

/**
 * Get a single blog post by its slug
 * @param slug - The URL-friendly identifier for the post
 * @returns The blog post if found, undefined otherwise
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Get all blog posts sorted by date (newest first)
 * @returns Array of blog posts sorted by date descending
 */
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get posts filtered by category
 * @param category - The category to filter by
 * @returns Array of blog posts in the specified category, sorted by date
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Get all unique categories from blog posts
 * @returns Array of unique category strings
 */
export function getAllCategories(): string[] {
  const categories = blogPosts.map((post) => post.category);
  return [...new Set(categories)].sort();
}
