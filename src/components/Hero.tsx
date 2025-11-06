import { Button } from "./ui/button";
import { Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Abstract geometric background with purple and cyan */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#8A2BE2] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#6EE7FF] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-[#8A2BE2] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Tech grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36">
        <div className="text-center">
          {/* Tech badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-[#6EE7FF]" />
            <span className="text-sm text-slate-200">AI-Powered Development Platform</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            RapidPrompt
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Supercharge your development workflow with AI-powered prompts
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white border-0 px-8 py-6 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2" />
              Browse Prompts
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-[#6EE7FF] text-[#6EE7FF] hover:bg-[#6EE7FF]/10 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Submit a Prompt
            </Button>
          </div>
          
          {/* Stats or trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12 text-sm text-slate-400">
            <div className="flex flex-col items-center">
              <div className="text-2xl text-white mb-1">2,500+</div>
              <div>Prompts</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl text-white mb-1">50K+</div>
              <div>Developers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl text-white mb-1">1M+</div>
              <div>Copies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
