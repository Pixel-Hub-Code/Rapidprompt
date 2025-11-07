export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string;
  authorInitials: string;
  date: string;
  readTime: string;
  category: string;
  likes: number;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "10-essential-ai-prompts",
    title: "10 Essential AI Prompts Every Developer Should Know",
    excerpt: "Discover the most useful AI prompts that will transform your daily development workflow and boost productivity by 10x.",
    date: "Nov 3, 2025",
    readTime: "5 min read",
    category: "Productivity",
    author: "Sarah Chen",
    authorInitials: "SC",
    authorBio: "Senior Developer and AI enthusiast with 10+ years of experience. Passionate about helping developers leverage AI to build better software faster.",
    likes: 248,
    content: `
# Introduction

Artificial Intelligence has revolutionized the way developers work. In this comprehensive guide, we'll explore the 10 most essential AI prompts that every developer should have in their toolkit.

## 1. Code Review Assistant

One of the most valuable AI prompts is the Code Review Assistant. This prompt helps you identify bugs, security vulnerabilities, and areas for improvement in your code.

### How to Use It

Simply paste your code and ask the AI to review it. The AI will analyze your code and provide detailed feedback on:

- Potential bugs and issues
- Security vulnerabilities
- Performance optimizations
- Code quality improvements
- Best practices

## 2. Documentation Generator

Writing documentation can be time-consuming. An AI documentation generator can automatically create comprehensive documentation from your code.

### Benefits

- Saves countless hours
- Ensures consistency
- Improves code maintainability
- Makes onboarding easier for new team members

## 3. Bug Debugger

When you encounter an error, the Bug Debugger prompt can help you quickly identify the root cause and suggest solutions.

### Example Usage

Paste your error message and stack trace, and the AI will:

1. Analyze the error
2. Identify the root cause
3. Suggest step-by-step solutions
4. Provide prevention strategies

## 4. Test Case Generator

Testing is crucial for code quality. The Test Case Generator creates comprehensive unit and integration tests for your code.

## 5. SQL Query Optimizer

Database performance is critical. This prompt helps you optimize your SQL queries for better performance.

## 6. API Documentation

Generate beautiful API documentation automatically from your endpoints and code comments.

## 7. Git Commit Messages

Write meaningful, conventional commit messages that follow best practices.

## 8. React Component Builder

Generate React components with TypeScript, proper prop types, and accessibility features.

## 9. Code Refactoring

Get suggestions for refactoring your code to improve readability and maintainability.

## 10. Algorithm Optimization

Optimize your algorithms for better time and space complexity.

# Conclusion

These 10 AI prompts can dramatically improve your development workflow. By incorporating them into your daily work, you'll write better code faster and with fewer errors.

Start using these prompts today and experience the productivity boost for yourself!

## What's Next?

- Try out each prompt with your own code
- Customize prompts for your specific needs
- Share your favorite prompts with your team
- Explore our complete prompt library for more

Happy coding! 🚀
    `,
  },
  {
    id: "effective-prompts-code-generation",
    title: "How to Write Effective Prompts for Code Generation",
    excerpt: "Learn the art of prompt engineering specifically for generating clean, maintainable code with AI assistants.",
    date: "Oct 28, 2025",
    readTime: "8 min read",
    category: "Guide",
    author: "Marcus Johnson",
    authorInitials: "MJ",
    authorBio: "Technical writer and software architect specializing in AI-assisted development workflows.",
    likes: 192,
    content: `
# The Art of Prompt Engineering

Writing effective prompts is a skill that can dramatically improve the quality of AI-generated code. Let's explore the best practices.

## Understanding Context

The more context you provide, the better the results. Always include:

- Programming language and version
- Framework details
- Project requirements
- Constraints and limitations

## Be Specific

Vague prompts lead to generic code. Instead of "create a button", try "create a React button component with TypeScript, hover effects, and accessibility features".

## Iterative Refinement

Start broad, then refine based on results. Use follow-up prompts to improve the generated code.

# Conclusion

Mastering prompt engineering takes practice, but the results are worth it!
    `,
  },
  {
    id: "custom-prompt-library",
    title: "Building a Custom Prompt Library for Your Team",
    excerpt: "A comprehensive guide to creating and organizing team-specific prompts that align with your coding standards and best practices.",
    date: "Oct 15, 2025",
    readTime: "6 min read",
    category: "Team",
    author: "Emily Rodriguez",
    authorInitials: "ER",
    authorBio: "Engineering manager focused on developer productivity and team collaboration tools.",
    likes: 156,
    content: `
# Building Your Prompt Library

Creating a shared prompt library ensures consistency across your team and speeds up development.

## Getting Started

1. Identify common tasks
2. Document your coding standards
3. Create templates for each use case
4. Share with your team

## Best Practices

- Keep prompts versioned
- Document expected outputs
- Include examples
- Regular updates based on feedback

# Conclusion

A well-organized prompt library is a valuable team asset that pays dividends over time.
    `,
  },
  {
    id: "future-ai-development",
    title: "The Future of AI-Assisted Development",
    excerpt: "Exploring emerging trends in AI pair programming and what it means for the future of software development and engineering teams.",
    date: "Oct 8, 2025",
    readTime: "7 min read",
    category: "Trends",
    author: "David Kim",
    authorInitials: "DK",
    authorBio: "Technology futurist and keynote speaker on AI and software development trends.",
    likes: 203,
    content: `
# The Future is Here

AI is transforming software development in ways we couldn't imagine just a few years ago.

## Emerging Trends

- Real-time code collaboration with AI
- Automated testing and debugging
- Natural language programming
- AI-powered code reviews

## What This Means for Developers

Developers won't be replaced by AI, but those who use AI effectively will replace those who don't.

# Conclusion

The future of development is collaborative - human creativity combined with AI efficiency.
    `,
  },
];

// Helper function to get a post by ID
export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

// Helper function to get posts by category
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

// Helper function to get recent posts
export const getRecentBlogPosts = (limit: number = 4): BlogPost[] => {
  return blogPosts.slice(0, limit);
};
