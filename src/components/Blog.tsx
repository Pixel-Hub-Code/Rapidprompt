import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

const blogPosts = [
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
];

const categoryGradients: Record<string, string> = {
  Productivity: "from-[#8A2BE2] to-purple-600",
  Guide: "from-[#6EE7FF] to-cyan-500",
  Team: "from-purple-500 to-pink-500",
  Trends: "from-cyan-500 to-blue-500",
};

interface BlogProps {
  onNavigateToAll: () => void;
}

export function Blog({ onNavigateToAll }: BlogProps) {
  return (
    <section id="blog" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 mb-6">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">Resources</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tips, guides, and insights on AI-powered development
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white group overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${categoryGradients[post.category]}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-snug group-hover:text-[#8A2BE2] transition-colors duration-300 min-h-[3.5rem]">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 leading-relaxed text-sm">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500">By {post.author}</span>
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
        
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            onClick={onNavigateToAll}
            className="border-2 border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
