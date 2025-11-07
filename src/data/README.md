# How to Add Blog Posts and Prompts

This guide explains how to add new content to RapidPrompt.

## 📝 Adding a New Blog Post

Edit `/data/blogPosts.ts` and add a new entry to the `blogPosts` array:

```typescript
{
  id: "unique-url-slug",                    // Unique identifier (use kebab-case)
  title: "Your Blog Post Title",            // Main title
  excerpt: "Short description...",          // Preview text (1-2 sentences)
  date: "Nov 7, 2025",                      // Publication date
  readTime: "5 min read",                   // Estimated reading time
  category: "Productivity",                 // Categories: Productivity, Guide, Team, Trends, Frontend, Backend, DevOps
  author: "Your Name",                      // Author name
  authorInitials: "YN",                     // 2-letter initials for avatar
  authorBio: "Brief bio about you...",      // Short author description
  likes: 0,                                 // Starting like count
  content: `
# Your Full Article Content

Write your article content here using Markdown.

## Headings

Use ## for main sections and ### for subsections.

## Lists

- Bullet points work
- Just like this

## More Content

Add as many sections as you need!
  `,
}
```

### Tips for Blog Posts:
- Use unique IDs (they'll be used in URLs later)
- Keep excerpts concise and engaging
- Format content with Markdown (# headers, lists, etc.)
- Use realistic dates
- Choose appropriate categories

---

## 🚀 Adding a New Prompt

Edit `/data/prompts.ts` and add a new entry to the `prompts` array:

```typescript
{
  id: "unique-prompt-id",                   // Unique identifier (use kebab-case)
  title: "Your Prompt Name",                // Prompt title
  description: "What this prompt does",     // Short description (1-2 sentences)
  fullPrompt: `Your complete prompt text    // The full prompt template

Include placeholders like:
[PASTE YOUR CODE HERE]
[DESCRIBE YOUR REQUIREMENTS]

Make it detailed and helpful!`,
  likes: 0,                                 // Starting like count
  category: "Backend",                      // Categories: Backend, Frontend, DevOps, Design, Image Generation
  rating: 4.5,                              // Rating out of 5.0
}
```

### Available Categories:
- **Backend**: API, databases, server-side code
- **Frontend**: React, UI components, client-side code
- **DevOps**: Git, Docker, deployment, CI/CD
- **Design**: UI/UX, styling, Tailwind CSS
- **Image Generation**: AI art, logo design, visual content

### Tips for Prompts:
- Make prompts clear and actionable
- Include placeholder text in [BRACKETS]
- Number steps for complex instructions
- Explain what the AI should output
- Start with realistic like counts and ratings

---

## 📊 Examples

### Example Blog Post:
```typescript
{
  id: "getting-started-ai-prompts",
  title: "Getting Started with AI Prompts",
  excerpt: "A beginner's guide to using AI effectively in your development workflow.",
  date: "Nov 7, 2025",
  readTime: "4 min read",
  category: "Guide",
  author: "Jane Developer",
  authorInitials: "JD",
  authorBio: "Full-stack developer and AI enthusiast.",
  likes: 45,
  content: `
# Getting Started

Welcome to AI-assisted development!

## Step 1: Choose Your Tool

Start with a simple AI assistant...

## Step 2: Write Clear Prompts

Be specific about what you need...
  `,
}
```

### Example Prompt:
```typescript
{
  id: "api-error-handler",
  title: "Express.js Error Handler",
  description: "Create a robust error handling middleware for Express.js applications.",
  fullPrompt: `Create an Express.js error handling middleware with:

1. Different error types (validation, authentication, server errors)
2. Proper HTTP status codes
3. Structured JSON error responses
4. Logging for debugging
5. Development vs production error details

Requirements:
- Framework: Express.js
- TypeScript support
- [DESCRIBE ANY SPECIFIC NEEDS]`,
  likes: 87,
  category: "Backend",
  rating: 4.6,
}
```

---

## 🔄 After Adding Content

Your new content will automatically appear in:
- ✅ Blog section on homepage (latest 4 posts)
- ✅ "All Articles" page (searchable)
- ✅ Top Prompts section (top 6 prompts)
- ✅ "All Prompts" page (filterable by category)

No additional configuration needed!

---

## 📁 File Structure

```
/data
├── blogPosts.ts    ← Add blog posts here
├── prompts.ts      ← Add prompts here
└── README.md       ← This guide
```

---

## 💡 Pro Tips

1. **Keep IDs Unique**: Use descriptive kebab-case IDs
2. **Test Locally**: Add content and check how it looks
3. **Categories Matter**: Use correct categories for filtering
4. **Markdown Formatting**: Use proper heading levels (# ## ###)
5. **Realistic Data**: Use appropriate dates, likes, and ratings
6. **Proofread**: Check spelling and grammar before publishing

---

## 🎯 Quick Checklist

Before publishing new content:

- [ ] Unique ID (no duplicates)
- [ ] Compelling title and description
- [ ] Proper category selected
- [ ] Content formatted with Markdown
- [ ] Author info filled in (for blog posts)
- [ ] Placeholders in prompts use [BRACKETS]
- [ ] Tested in the application
- [ ] Proofread for typos

---

## ❓ Need Help?

If you need to add features like:
- Dynamic content from a CMS
- User-submitted posts
- Database integration
- Advanced filtering

Consider upgrading to a backend solution or CMS integration.

Happy content creating! 🎉
