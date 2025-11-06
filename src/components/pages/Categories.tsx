import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, Heart, Star, Sparkles } from "lucide-react";

interface CategoriesProps {
  onBack: () => void;
}

const allPrompts = [
  { title: "Code Review Assistant", description: "Detailed code reviews with best practices.", likes: 342, rating: 4.9, category: "Backend", fullPrompt: "" },
  { title: "React Component Builder", description: "Generate React components with TypeScript.", likes: 234, rating: 4.8, category: "Frontend", fullPrompt: "" },
  { title: "Git Commit Message Writer", description: "Conventional commit messages from diffs.", likes: 221, rating: 4.6, category: "DevOps", fullPrompt: "" },
  { title: "UI Component Designer", description: "Design beautiful, accessible UI components.", likes: 187, rating: 4.8, category: "Design", fullPrompt: "" },
  { title: "Image-to-Prompt Enhancer", description: "Generate high-quality prompts from an image brief.", likes: 168, rating: 4.7, category: "Image Generation", fullPrompt: "" },
];

const categoryOrder = ["All", "Backend", "Frontend", "DevOps", "Design", "Image Generation"] as const;

const categoryColors: Record<string, string> = {
  Backend: "bg-[#8A2BE2]/10 text-[#8A2BE2] border-[#8A2BE2]/20",
  Frontend: "bg-[#6EE7FF]/10 text-cyan-700 border-[#6EE7FF]/30",
  DevOps: "bg-purple-100 text-purple-700 border-purple-200",
  Design: "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Image Generation": "bg-pink-50 text-pink-700 border-pink-200",
};

const categoryGradients: Record<string, string> = {
  Backend: "from-[#8A2BE2] via-purple-500 to-[#8A2BE2]",
  Frontend: "from-[#6EE7FF] via-cyan-400 to-[#6EE7FF]",
  DevOps: "from-purple-500 via-purple-400 to-purple-500",
  Design: "from-cyan-500 via-cyan-400 to-cyan-500",
  "Image Generation": "from-pink-500 via-rose-400 to-pink-500",
};

export function Categories({ onBack }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return allPrompts;
    return allPrompts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 mb-4 shadow">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Browse by Category</span>
          </div>
          <h1 className="text-4xl lg:text-5xl text-slate-900">Categories</h1>
          <p className="text-lg text-slate-600 mt-2">Filter prompts by your area of interest</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === "All" ? "All" : cat)}
              className={`px-4 py-2 rounded-full border text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((prompt, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryGradients[prompt.category]} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:blur-md`}></div>
              <Card className="relative h-full bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${categoryGradients[prompt.category]}`}></div>
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className={`${categoryColors[prompt.category]} border shadow-sm backdrop-blur-sm`}>
                      {prompt.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-slate-500">
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span className="text-xs">{prompt.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{prompt.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-base leading-snug">{prompt.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No prompts in this category yet</p>
          </div>
        )}
      </div>
    </div>
  );
}


