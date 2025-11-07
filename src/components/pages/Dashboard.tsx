import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowLeft, Heart, Copy, Star, Clock, Sparkles, Plus } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  doc, 
  updateDoc, 
  deleteDoc,
  increment,
  serverTimestamp,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface DashboardProps {
  onNavigateToHome: () => void;
  onLogout: () => void;
}

interface UserPrompt {
  id: string;
  title: string;
  description: string;
  fullPrompt: string;
  category: string;
  userId: string;
  userName: string;
  likes: number;
  likedBy: string[];
  createdAt: any;
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
  const { user } = useAuth();
  const [userPrompts, setUserPrompts] = useState<UserPrompt[]>([]);
  const [isAddPromptOpen, setIsAddPromptOpen] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    description: "",
    fullPrompt: "",
    category: "Backend",
  });
  const [loading, setLoading] = useState(false);

  // Fetch user's submitted prompts
  useEffect(() => {
    if (!user) return;

    const promptsRef = collection(db, "prompts");
    const q = query(promptsRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prompts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserPrompt[];
      setUserPrompts(prompts);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCopy = (title: string) => {
    toast.success(`"${title}" copied to clipboard!`);
  };

  const handleAddPrompt = async () => {
    if (!user) {
      toast.error("You must be logged in to add a prompt");
      return;
    }

    if (!newPrompt.title || !newPrompt.description || !newPrompt.fullPrompt) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const promptsRef = collection(db, "prompts");
      await addDoc(promptsRef, {
        ...newPrompt,
        userId: user.uid,
        userName: user.displayName || user.email?.split("@")[0] || "Anonymous",
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
      });

      toast.success("Prompt added successfully!");
      setIsAddPromptOpen(false);
      setNewPrompt({
        title: "",
        description: "",
        fullPrompt: "",
        category: "Backend",
      });
    } catch (error) {
      console.error("Error adding prompt:", error);
      toast.error("Failed to add prompt");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (promptId: string, likedBy: string[]) => {
    if (!user) {
      toast.error("You must be logged in to like prompts");
      return;
    }

    const promptRef = doc(db, "prompts", promptId);
    const hasLiked = likedBy.includes(user.uid);

    try {
      if (hasLiked) {
        // Unlike
        await updateDoc(promptRef, {
          likes: increment(-1),
          likedBy: likedBy.filter((id) => id !== user.uid),
        });
        toast.success("Removed like");
      } else {
        // Like
        await updateDoc(promptRef, {
          likes: increment(1),
          likedBy: [...likedBy, user.uid],
        });
        toast.success("Liked!");
      }
    } catch (error) {
      console.error("Error updating like:", error);
      toast.error("Failed to update like");
    }
  };

  const handleDeletePrompt = async (promptId: string) => {
    if (!confirm("Are you sure you want to delete this prompt?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "prompts", promptId));
      toast.success("Prompt deleted successfully!");
    } catch (error) {
      console.error("Error deleting prompt:", error);
      toast.error("Failed to delete prompt");
    }
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-slate-900">My Submitted Prompts</h2>
              <Dialog open={isAddPromptOpen} onOpenChange={setIsAddPromptOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Prompt</DialogTitle>
                    <DialogDescription>
                      Share your prompt with the community. Fill in all the details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., React Component Builder"
                        value={newPrompt.title}
                        onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newPrompt.category}
                        onValueChange={(value: string) => setNewPrompt({ ...newPrompt, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Backend">Backend</SelectItem>
                          <SelectItem value="Frontend">Frontend</SelectItem>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Image Generation">Image Generation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of what this prompt does..."
                        value={newPrompt.description}
                        onChange={(e) => setNewPrompt({ ...newPrompt, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullPrompt">Full Prompt</Label>
                      <Textarea
                        id="fullPrompt"
                        placeholder="Enter the complete prompt here..."
                        value={newPrompt.fullPrompt}
                        onChange={(e) => setNewPrompt({ ...newPrompt, fullPrompt: e.target.value })}
                        rows={10}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddPromptOpen(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddPrompt}
                      disabled={loading}
                      className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white"
                    >
                      {loading ? "Adding..." : "Add Prompt"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {userPrompts.length === 0 ? (
              <div className="text-center py-20">
                <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl text-slate-900 mb-2">No Submissions Yet</h3>
                <p className="text-slate-600 mb-6">Share your prompts with the community</p>
                <Button
                  onClick={() => setIsAddPromptOpen(true)}
                  className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Your First Prompt
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPrompts.map((prompt) => (
                  <Card key={prompt.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={`${categoryColors[prompt.category]} border`}>
                          {prompt.category}
                        </Badge>
                        <button
                          onClick={() => handleLike(prompt.id, prompt.likedBy)}
                          className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              user && prompt.likedBy.includes(user.uid)
                                ? "fill-rose-500 text-rose-500"
                                : "text-slate-400 hover:text-rose-500"
                            }`}
                          />
                          <span className="text-sm text-slate-600">{prompt.likes}</span>
                        </button>
                      </div>
                      <CardTitle className="text-lg">{prompt.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(prompt.fullPrompt);
                          handleCopy(prompt.title);
                        }}
                        className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Prompt
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePrompt(prompt.id)}
                        className="w-full"
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
