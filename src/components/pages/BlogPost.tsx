import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, Bookmark } from "lucide-react";

interface BlogPostProps {
  onBack: () => void;
  articleId?: string;
}

export function BlogPost({ onBack, articleId }: BlogPostProps) {
  // Mock blog post data - in real app, this would be fetched based on articleId
  const post = {
    title: "10 Essential AI Prompts Every Developer Should Know",
    author: "Sarah Chen",
    date: "Nov 3, 2025",
    readTime: "5 min read",
    category: "Productivity",
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
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-[#8A2BE2] to-purple-600 text-white border-0">
              {post.category}
            </Badge>
            <h1 className="text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200"
              >
                <Heart className="w-4 h-4 mr-2" />
                {post.likes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div className="prose prose-slate max-w-none">
            <div className="text-slate-700 leading-relaxed space-y-6">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl text-slate-900 mt-12 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl text-slate-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl text-slate-900 mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-6">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                } else if (paragraph.match(/^\d+\. /)) {
                  return (
                    <li key={index} className="ml-6">
                      {paragraph.replace(/^\d+\. /, '')}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return <p key={index}>{paragraph}</p>;
                }
                return null;
              })}
            </div>
          </div>

          <Separator className="my-12" />

          {/* Author Bio */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8A2BE2] to-[#6EE7FF] rounded-full flex items-center justify-center text-white text-xl">
                SC
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-slate-900 mb-2">About {post.author}</h3>
                <p className="text-slate-600 mb-4">
                  Senior Developer and AI enthusiast with 10+ years of experience. Passionate about helping developers leverage AI to build better software faster.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2]/5"
                >
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
