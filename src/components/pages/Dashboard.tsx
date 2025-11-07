import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowLeft, Heart, Copy, Star, TrendingUp, Clock, Sparkles, Plus } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface DashboardProps {
  onNavigateToHome: () => void;
  onLogout: () => void;
}

const savedPrompts = [
  {
    title: "Code Review Assistant",
    category: "Backend",
    saves: 342,
    rating: 4.9,
    savedDate: "2 days ago",
  },
  {
    title: "React Component Builder",
    category: "Frontend",
    saves: 234,
    rating: 4.8,
    savedDate: "1 week ago",
  },
  {
    title: "Git Commit Message Writer",
    category: "DevOps",
    saves: 221,
    rating: 4.6,
    savedDate: "3 days ago",
  },
];

const recentActivity = [
  { action: "Copied", prompt: "SQL Query Optimizer", time: "2 hours ago" },
  { action: "Saved", prompt: "API Documentation Generator", time: "1 day ago" },
  { action: "Copied", prompt: "Bug Debugger Pro", time: "3 days ago" },
  { action: "Saved", prompt: "Test Case Generator", time: "1 week ago" },
];

const stats = [
  { label: "Prompts Saved", value: "12", icon: Heart, gradient: "from-rose-500 to-pink-500" },
  { label: "Times Copied", value: "48", icon: Copy, gradient: "from-[#8A2BE2] to-purple-600" },
  { label: "Total Likes Given", value: "24", icon: Star, gradient: "from-yellow-400 to-orange-500" },
  { label: "Hours Saved", value: "36", icon: Clock, gradient: "from-[#6EE7FF] to-cyan-500" },
];

const categoryColors: Record<string, string> = {
  Backend: "bg-[#8A2BE2]/10 text-[#8A2BE2] border-[#8A2BE2]/20",
  Frontend: "bg-[#6EE7FF]/10 text-cyan-700 border-[#6EE7FF]/30",
  DevOps: "bg-purple-100 text-purple-700 border-purple-200",
};

export function Dashboard({ onNavigateToHome, onLogout }: DashboardProps) {
  const handleCopy = (title: string) => {
    toast.success(`"${title}" copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onNavigateToHome}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
              className="border-slate-200"
            >
              Logout
            </Button>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8A2BE2] to-[#6EE7FF] rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              JD
            </div>
            <div>
              <h1 className="text-3xl text-slate-900">Welcome back, John!</h1>
              <p className="text-slate-600">Here's what's happening with your prompts</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-3xl text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="saved">Saved Prompts</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="submitted">My Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-slate-900">Your Saved Prompts</h2>
              <Button className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Browse More
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPrompts.map((prompt, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={`${categoryColors[prompt.category]} border`}>
                        {prompt.category}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{prompt.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3" />
                      Saved {prompt.savedDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{prompt.saves} saves</span>
                      <span>{prompt.rating} rating</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleCopy(prompt.title)}
                      className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Prompt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <h2 className="text-2xl text-slate-900 mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-0">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className={`p-4 flex items-center justify-between hover:bg-slate-50 ${
                      index !== recentActivity.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.action === "Copied" 
                          ? "bg-purple-100 text-purple-600" 
                          : "bg-rose-100 text-rose-600"
                      }`}>
                        {activity.action === "Copied" ? (
                          <Copy className="w-5 h-5" />
                        ) : (
                          <Heart className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-slate-900">{activity.action} <span className="font-medium">{activity.prompt}</span></p>
                        <p className="text-sm text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4">
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl text-slate-900 mb-2">No Submissions Yet</h3>
              <p className="text-slate-600 mb-6">Share your prompts with the community</p>
              <Button className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Submit Your First Prompt
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
