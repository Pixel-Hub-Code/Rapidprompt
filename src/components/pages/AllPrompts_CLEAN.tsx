import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Heart, Copy, Star, ArrowLeft, Search, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";
import { prompts as allPrompts } from "../../data/prompts";

interface AllPromptsProps {
  onBack: () => void;
}

const categoryColors: Record<string, string> = {
  Backend: "bg-[#8A2BE2]/10 text-[#8A2BE2] border-[#8A2BE2]/20",
  Frontend: "bg-[#6EE7FF]/10 text-cyan-700 border-[#6EE7FF]/30",
  DevOps: "bg-purple-100 text-purple-700 border-purple-200",
  Design: "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Image Generation": "bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-purple-200",
};

const categoryGradients: Record<string, string> = {
  Backend: "from-[#8A2BE2] via-purple-500 to-[#8A2BE2]",
  Frontend: "from-[#6EE7FF] via-cyan-400 to-[#6EE7FF]",
  DevOps: "from-purple-500 via-purple-400 to-purple-500",
  Design: "from-cyan-500 via-cyan-400 to-cyan-500",
  "Image Generation": "from-pink-500 via-purple-500 to-pink-500",
};

export function AllPrompts({ onBack }: AllPromptsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPrompt, setSelectedPrompt] = useState<typeof allPrompts[0] | null>(null);

  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`"${title}" copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
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
          <h1 className="text-4xl lg:text-5xl text-slate-900 mb-4">All Prompts</h1>
          <p className="text-lg text-slate-600">Browse our complete collection of {allPrompts.length} AI prompts</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="DevOps">DevOps</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Image Generation">Image Generation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            Showing {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}
          </p>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrompts.map((prompt, index) => (
            <div
              key={index}
              onClick={() => setSelectedPrompt(prompt)}
              className="group relative cursor-pointer"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryGradients[prompt.category]} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:blur-md`}></div>
              
              <Card className="relative h-full bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                  <CardTitle className="text-base leading-snug group-hover:text-[#8A2BE2] transition-colors">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm">
                    {prompt.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(prompt.fullPrompt, prompt.title);
                    }}
                    className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg transition-all duration-300 text-sm"
                  >
                    <Copy className="w-3.5 h-3.5 mr-2" />
                    Copy
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredPrompts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No prompts found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Prompt Detail Dialog */}
      <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-2xl border-2 border-white/50 shadow-2xl">
          {selectedPrompt && (
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${categoryGradients[selectedPrompt.category]}`}></div>
          )}
          
          <DialogHeader className="relative pt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  {selectedPrompt && (
                    <>
                      <Badge variant="outline" className={`${categoryColors[selectedPrompt.category]} border shadow-sm`}>
                        {selectedPrompt.category}
                      </Badge>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                          <span className="text-sm">{selectedPrompt.likes} likes</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-slate-600">{selectedPrompt.rating} rating</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <DialogTitle className="text-2xl">{selectedPrompt?.title}</DialogTitle>
                <DialogDescription className="mt-2 text-base">{selectedPrompt?.description}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto mt-6 pr-2">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border-2 border-slate-100 shadow-inner">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="ml-2 text-xs text-slate-500">Prompt Template</span>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-mono">
                {selectedPrompt?.fullPrompt}
              </pre>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
            <Button
              onClick={() => {
                if (selectedPrompt) {
                  handleCopy(selectedPrompt.fullPrompt, selectedPrompt.title);
                }
              }}
              className="flex-1 bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Full Prompt
            </Button>
            <Button variant="outline" onClick={() => setSelectedPrompt(null)} className="border-2">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
