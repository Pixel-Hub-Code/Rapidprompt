import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Heart, Copy, ArrowRight, Star, Sparkles } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Badge } from "./ui/badge";
import { getTopPrompts } from "../data/prompts";

const prompts = getTopPrompts(6);

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

interface TopPromptsProps {
  onNavigateToAll: () => void;
}

export function TopPrompts({ onNavigateToAll }: TopPromptsProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<typeof prompts[0] | null>(null);

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`"${title}" copied to clipboard!`);
  };

  const handleCardClick = (prompt: typeof prompts[0]) => {
    setSelectedPrompt(prompt);
  };

  return (
    <section id="prompts" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      {/* Enhanced decorative background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiM4QTJCRTIiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 mb-6 shadow-lg">
            <Star className="w-4 h-4 fill-purple-700" />
            <span className="text-sm">Community Favorites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">Top Prompts</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Most loved prompts from our community of developers
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {prompts.map((prompt, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(prompt)}
              className="group relative cursor-pointer"
            >
              {/* Animated gradient border */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryGradients[prompt.category]} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:blur-md animate-tilt`}></div>
              
              {/* Main card */}
              <Card className="relative h-full bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                </div>
                
                {/* Colored accent top border */}
                <div className={`h-1.5 bg-gradient-to-r ${categoryGradients[prompt.category]}`}></div>
                
                <CardHeader className="pb-3 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      variant="outline" 
                      className={`${categoryColors[prompt.category]} border shadow-sm backdrop-blur-sm`}
                    >
                      {prompt.category}
                    </Badge>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-slate-500">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm">{prompt.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm text-slate-600">{prompt.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-snug group-hover:text-[#8A2BE2] transition-colors duration-300 min-h-[3.5rem] flex items-center">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 leading-relaxed text-slate-600">
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
                    className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 border-0 text-sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Quick Copy
                  </Button>
                  
                  {/* View details hint */}
                  <div className="mt-3 text-center">
                    <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Click to view full prompt
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            onClick={onNavigateToAll}
            className="bg-gradient-to-r from-[#6EE7FF] to-cyan-500 hover:from-cyan-400 hover:to-cyan-600 text-slate-900 shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 border-0"
          >
            View All Top Prompts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Enhanced Prompt Detail Dialog */}
      <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-2xl border-2 border-white/50 shadow-2xl">
          {/* Decorative gradient header */}
          {selectedPrompt && (
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${categoryGradients[selectedPrompt.category]}`}></div>
          )}
          
          <DialogHeader className="relative pt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  {selectedPrompt && (
                    <>
                      <Badge 
                        variant="outline" 
                        className={`${categoryColors[selectedPrompt.category]} border shadow-sm`}
                      >
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
                <DialogTitle className="text-2xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
                  {selectedPrompt?.title}
                </DialogTitle>
                <DialogDescription className="mt-2 text-base">
                  {selectedPrompt?.description}
                </DialogDescription>
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
              className="flex-1 bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 border-0"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Full Prompt
            </Button>
            <Button 
              variant="outline"
              onClick={() => setSelectedPrompt(null)}
              className="border-2 hover:bg-slate-50"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
