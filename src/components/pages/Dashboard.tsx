import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Plus, Edit, Trash2, Copy, ArrowLeft, Save, X } from "lucide-react";
import { toast } from "sonner";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Prompt {
  id: string;
  title: string;
  description: string;
  fullPrompt: string;
  category: string;
  createdAt: any;
  updatedAt: any;
  userId: string;
}

interface PromptFormData {
  title: string;
  description: string;
  fullPrompt: string;
  category: string;
}

const categories = ["Backend", "Frontend", "DevOps", "Design", "Image Generation"];

interface DashboardProps {
  onBack: () => void;
}

export function Dashboard({ onBack }: DashboardProps) {
  const { user, loading } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      onBack();
    }
  }, [user, loading, onBack]);

  const form = useForm<PromptFormData>({
    defaultValues: {
      title: "",
      description: "",
      fullPrompt: "",
      category: "Backend",
    },
    mode: "onChange",
  });

  // Load user's prompts
  useEffect(() => {
    if (user) {
      loadPrompts();
    }
  }, [user]);

  const loadPrompts = async () => {
    if (!user) return;
    
    setIsLoadingPrompts(true);
    try {
      const promptsRef = collection(db, "prompts");
      const q = query(
        promptsRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const promptsData: Prompt[] = [];
      querySnapshot.forEach((doc) => {
        promptsData.push({ id: doc.id, ...doc.data() } as Prompt);
      });
      setPrompts(promptsData);
    } catch (error) {
      console.error("Error loading prompts:", error);
      toast.error("Failed to load prompts");
    } finally {
      setIsLoadingPrompts(false);
    }
  };

  const handleOpenDialog = (prompt?: Prompt) => {
    if (prompt) {
      setEditingPrompt(prompt);
      form.reset({
        title: prompt.title,
        description: prompt.description,
        fullPrompt: prompt.fullPrompt,
        category: prompt.category,
      });
    } else {
      setEditingPrompt(null);
      form.reset({
        title: "",
        description: "",
        fullPrompt: "",
        category: "Backend",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPrompt(null);
    form.reset();
  };

  const onSubmit = async (data: PromptFormData) => {
    if (!user) {
      toast.error("You must be logged in to submit prompts");
      return;
    }

    setIsLoading(true);
    try {
      if (editingPrompt) {
        // Update existing prompt
        const promptRef = doc(db, "prompts", editingPrompt.id);
        await updateDoc(promptRef, {
          ...data,
          updatedAt: new Date(),
        });
        toast.success("Prompt updated successfully!");
      } else {
        // Create new prompt
        await addDoc(collection(db, "prompts"), {
          ...data,
          userId: user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
          likes: 0,
          rating: 0,
        });
        toast.success("Prompt submitted successfully!");
      }
      handleCloseDialog();
      loadPrompts();
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast.error("Failed to save prompt");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (promptId: string) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;

    try {
      await deleteDoc(doc(db, "prompts", promptId));
      toast.success("Prompt deleted successfully!");
      loadPrompts();
    } catch (error) {
      console.error("Error deleting prompt:", error);
      toast.error("Failed to delete prompt");
    }
  };

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`"${title}" copied to clipboard!`);
  };

  const categoryColors: Record<string, string> = {
    Backend: "bg-[#8A2BE2]/10 text-[#8A2BE2] border-[#8A2BE2]/20",
    Frontend: "bg-[#6EE7FF]/10 text-cyan-700 border-[#6EE7FF]/30",
    DevOps: "bg-purple-100 text-purple-700 border-purple-200",
    Design: "bg-cyan-50 text-cyan-700 border-cyan-200",
    "Image Generation": "bg-pink-50 text-pink-700 border-pink-200",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20 flex items-center justify-center">
        <p className="text-slate-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl lg:text-5xl text-slate-900 mb-2">My Dashboard</h1>
              <p className="text-lg text-slate-600">
                Manage your prompts and create new ones
              </p>
            </div>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Prompt
            </Button>
          </div>
        </div>

        {/* Prompts Grid */}
        {isLoadingPrompts ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Loading your prompts...</p>
          </div>
        ) : prompts.length === 0 ? (
          <Card className="border-2 border-dashed border-slate-300 bg-slate-50">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No prompts yet</h3>
              <p className="text-slate-600 mb-6 text-center max-w-md">
                Get started by creating your first prompt. Share your best AI prompts with the community!
              </p>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Prompt
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <Card
                key={prompt.id}
                className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white group overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className={categoryColors[prompt.category]}>
                      {prompt.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-slate-100"
                        onClick={() => handleOpenDialog(prompt)}
                      >
                        <Edit className="w-4 h-4 text-slate-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50"
                        onClick={() => handleDelete(prompt.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-snug group-hover:text-[#8A2BE2] transition-colors">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 leading-relaxed">
                    {prompt.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(prompt.fullPrompt, prompt.title)}
                      className="flex-1 border-slate-300 hover:bg-slate-50"
                    >
                      <Copy className="w-3.5 h-3.5 mr-2" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const textarea = document.createElement("textarea");
                        textarea.value = prompt.fullPrompt;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textarea);
                        toast.success("Full prompt copied!");
                      }}
                      className="border-slate-300 hover:bg-slate-50"
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Prompt Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#6EE7FF] bg-clip-text text-transparent">
                {editingPrompt ? "Edit Prompt" : "Create New Prompt"}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {editingPrompt
                  ? "Update your prompt details"
                  : "Share your AI prompt with the community"}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{
                    required: "Title is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Code Review Assistant"
                          {...field}
                          disabled={isLoading}
                          className="bg-white border-slate-300 focus:border-[#8A2BE2] focus:ring-[#8A2BE2] text-slate-900 placeholder:text-slate-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  rules={{
                    required: "Description is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of what this prompt does..."
                          {...field}
                          disabled={isLoading}
                          rows={3}
                          className="bg-white border-slate-300 focus:border-[#8A2BE2] focus:ring-[#8A2BE2] text-slate-900 placeholder:text-slate-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  rules={{
                    required: "Category is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white border-slate-300 focus:border-[#8A2BE2] text-slate-900">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullPrompt"
                  rules={{
                    required: "Prompt content is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Prompt Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your full prompt template here..."
                          {...field}
                          disabled={isLoading}
                          rows={8}
                          className="bg-white border-slate-300 focus:border-[#8A2BE2] focus:ring-[#8A2BE2] text-slate-900 placeholder:text-slate-400 font-mono text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                    disabled={isLoading}
                    className="flex-1 border-slate-300 hover:bg-slate-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading
                      ? editingPrompt
                        ? "Updating..."
                        : "Submitting..."
                      : editingPrompt
                      ? "Update Prompt"
                      : "Submit Prompt"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

