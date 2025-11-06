import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useAuth } from "../contexts/AuthContext";
import { Github, Mail, Chrome } from "lucide-react";
import { Separator } from "./ui/separator";

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "email" | "oauth";
  initialMode?: "signup" | "login";
  onSuccess?: () => void;
}

interface EmailFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

export function SignupDialog({ open, onOpenChange, defaultTab = "email", initialMode = "signup", onSuccess }: SignupDialogProps) {
  const [activeTab, setActiveTab] = useState<"signup" | "login">(initialMode);
  const { signUpWithEmail, signInWithEmail, signInWithGoogle, signInWithGithub } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Reset to initial mode when dialog opens
  useEffect(() => {
    if (open) {
      setActiveTab(initialMode);
    }
  }, [open, initialMode]);

  // Signup form
  const signupForm = useForm<EmailFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // Login form
  const loginForm = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email) || "Invalid email address";
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    const password = signupForm.getValues("password");
    return confirmPassword === password || "Passwords do not match";
  };

  // Watch password for confirm password validation
  const password = signupForm.watch("password");

  const onSignupSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      await signUpWithEmail(data.email, data.password, data.name);
      onOpenChange(false);
      signupForm.reset();
      onSuccess?.();
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await signInWithEmail(data.email, data.password);
      onOpenChange(false);
      loginForm.reset();
      onSuccess?.();
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setIsLoading(true);
    try {
      await signInWithGithub();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white border-slate-200 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#6EE7FF] bg-clip-text text-transparent">
            {activeTab === "signup" ? "Create your account" : "Welcome back"}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {activeTab === "signup"
              ? "Sign up to access all features and save your favorite prompts"
              : "Sign in to your account to continue"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "signup" | "login")} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-lg">
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-white data-[state=active]:text-[#8A2BE2] data-[state=active]:shadow-sm rounded-md"
            >
              Sign Up
            </TabsTrigger>
            <TabsTrigger 
              value="login"
              className="data-[state=active]:bg-white data-[state=active]:text-[#8A2BE2] data-[state=active]:shadow-sm rounded-md"
            >
              Login
            </TabsTrigger>
          </TabsList>

          {/* OAuth Buttons - Show for both signup and login */}
          <div className="mt-6 space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <Chrome className="w-4 h-4 mr-2 text-red-500" />
              <span className="text-slate-700">Continue with Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors"
              onClick={handleGithubSignup}
              disabled={isLoading}
            >
              <Github className="w-4 h-4 mr-2 text-slate-900" />
              <span className="text-slate-700">Continue with GitHub</span>
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-500 font-medium">Or continue with email</span>
            </div>
          </div>

          {/* Signup Form */}
          <TabsContent value="signup" className="space-y-4 mt-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  rules={{
                    required: "Name is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
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
                  control={signupForm.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    validate: validateEmail,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="john@example.com" 
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
                  control={signupForm.control}
                  name="password"
                  rules={{ 
                    required: "Password is required",
                    validate: validatePassword,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
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
                  control={signupForm.control}
                  name="confirmPassword"
                  rules={{ 
                    required: "Please confirm your password",
                    validate: validateConfirmPassword,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          disabled={isLoading}
                          className="bg-white border-slate-300 focus:border-[#8A2BE2] focus:ring-[#8A2BE2] text-slate-900 placeholder:text-slate-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 mt-6" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Login Form */}
          <TabsContent value="login" className="space-y-4 mt-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    validate: validateEmail,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="john@example.com" 
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
                  control={loginForm.control}
                  name="password"
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          disabled={isLoading}
                          className="bg-white border-slate-300 focus:border-[#8A2BE2] focus:ring-[#8A2BE2] text-slate-900 placeholder:text-slate-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 mt-6" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

