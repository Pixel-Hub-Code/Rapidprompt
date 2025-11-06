import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, ArrowRight, Calendar, Clock, BookOpen, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

interface AllArticlesProps {
  onBack: () => void;
}

const allArticles = [
  {
    title: "10 Essential AI Prompts Every Developer Should Know",
    excerpt: "Discover the most useful AI prompts that will transform your daily development workflow and boost productivity by 10x.",
    date: "Nov 3, 2025",
    readTime: "5 min read",
    category: "Productivity",
    author: "Sarah Chen",
  },
  {
    title: "How to Write Effective Prompts for Code Generation",
    excerpt: "Learn the art of prompt engineering specifically for generating clean, maintainable code with AI assistants.",
    date: "Oct 28, 2025",
    readTime: "8 min read",
    category: "Guide",
    author: "Marcus Johnson",
  },
  {
    title: "Building a Custom Prompt Library for Your Team",
    excerpt: "A comprehensive guide to creating and organizing team-specific prompts that align with your coding standards and best practices.",
    date: "Oct 15, 2025",
    readTime: "6 min read",
    category: "Team",
    author: "Emily Rodriguez",
  },
  {
    title: "The Future of AI-Assisted Development",
    excerpt: "Exploring emerging trends in AI pair programming and what it means for the future of software development and engineering teams.",
    date: "Oct 8, 2025",
    readTime: "7 min read",
    category: "Trends",
    author: "David Kim",
  },
  {
    title: "Debugging with AI: Best Practices",
    excerpt: "Master the art of using AI to debug complex issues faster and more effectively than traditional methods.",
    date: "Sep 25, 2025",
    readTime: "6 min read",
    category: "Guide",
    author: "Alex Turner",
  },
  {
    title: "AI Prompts for Frontend Development",
    excerpt: "Specialized prompts for React, Vue, and Angular developers to accelerate UI development.",
    date: "Sep 18, 2025",
    readTime: "9 min read",
    category: "Frontend",
    author: "Jessica Lee",
  },
  {
    title: "Backend Optimization with AI",
    excerpt: "Use AI to optimize your APIs, database queries, and server performance.",
    date: "Sep 10, 2025",
    readTime: "7 min read",
    category: "Backend",
    author: "Ryan O'Connor",
  },
  {
    title: "DevOps Automation Using AI Prompts",
    excerpt: "Streamline your CI/CD pipelines and infrastructure management with intelligent prompts.",
    date: "Aug 30, 2025",
    readTime: "10 min read",
    category: "DevOps",
    author: "Priya Patel",
  },
  {
    title: "Code Review Automation Guide",
    excerpt: "Set up automated code reviews using AI to maintain code quality across your team.",
    date: "Aug 22, 2025",
    readTime: "8 min read",
    category: "Guide",
    author: "Thomas Schmidt",
  },
];

const categoryGradients: Record<string, string> = {
  Productivity: "from-[#8A2BE2] to-purple-600",
  Guide: "from-[#6EE7FF] to-cyan-500",
  Team: "from-purple-500 to-pink-500",
  Trends: "from-cyan-500 to-blue-500",
  Frontend: "from-[#6EE7FF] to-cyan-600",
  Backend: "from-[#8A2BE2] to-purple-700",
  DevOps: "from-purple-600 to-purple-800",
};

export function AllArticles({ onBack }: AllArticlesProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl lg:text-5xl text-slate-900 mb-4">Blog & Articles</h1>
          <p className="text-lg text-slate-600">Insights, guides, and best practices for AI-powered development</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200"
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <Card 
              key={index} 
              className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white group overflow-hidden cursor-pointer"
            >
              <div className={`h-2 bg-gradient-to-r ${categoryGradients[article.category]}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl leading-snug group-hover:text-[#8A2BE2] transition-colors duration-300 min-h-[4rem]">
                  {article.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">By {article.author}</span>
                  <Button 
                    variant="link" 
                    className="text-[#8A2BE2] hover:text-purple-700 p-0 h-auto group/btn"
                  >
                    Read
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No articles found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
