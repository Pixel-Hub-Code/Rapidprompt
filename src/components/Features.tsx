import { Card, CardContent } from "./ui/card";
import { Library, TrendingUp, FolderTree, Sparkles } from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Prompt Library",
    description: "Curated collection of AI prompts for every development need",
    gradient: "from-[#8A2BE2] to-purple-600",
    items: ["2,500+ prompts", "Regular updates", "Community-driven"],
  },
  {
    icon: TrendingUp,
    title: "Top Prompts",
    description: "Most popular and effective prompts voted by the community",
    gradient: "from-[#6EE7FF] to-cyan-500",
    items: ["Real-time ranking", "User ratings", "Weekly featured"],
  },
  {
    icon: FolderTree,
    title: "Categories",
    description: "Organized by Backend, Frontend, DevOps, Design & more",
    gradient: "from-purple-500 to-[#6EE7FF]",
    items: ["8+ categories", "Smart filtering", "Quick search"],
  },
];

interface FeaturesProps {
  onNavigateToCategories?: () => void;
}

export function Features({ onNavigateToCategories }: FeaturesProps) {
  return (
    <section id="features" className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
            Everything you need to supercharge your development workflow
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
            Discover, share, and leverage the power of AI prompts tailored for developers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <Card 
              key={index}
              onClick={() => {
                if (feature.title === "Categories") {
                  onNavigateToCategories?.();
                }
              }}
              className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white overflow-hidden group ${feature.title === "Categories" ? "cursor-pointer" : ""}`}
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardContent className="pt-10 pb-10 text-center relative">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{feature.description}</p>
                
                {/* Feature items */}
                <ul className="space-y-2">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-500 flex items-center justify-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
