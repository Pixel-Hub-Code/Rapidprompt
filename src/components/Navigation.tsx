import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Code2, Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Prompts", href: "#prompts" },
  { label: "Categories", href: "#features" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
];

interface NavigationProps {
  onNavigateToLogin: () => void;
  onNavigateToDashboard: () => void;
  isLoggedIn: boolean;
}

export function Navigation({ onNavigateToLogin, onNavigateToDashboard, isLoggedIn }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#8A2BE2] to-[#6EE7FF] rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl text-white">RapidPrompt</span>
              <div className="flex items-center gap-1 text-xs text-[#6EE7FF]">
                <Sparkles className="w-3 h-3" />
                <span>AI-Powered</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#6EE7FF] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoggedIn ? (
              <Button
                onClick={onNavigateToDashboard}
                className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={onNavigateToLogin}
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Login
                </Button>
                <Button 
                  onClick={onNavigateToLogin}
                  className="bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-slate-900 border-slate-800 w-full sm:w-80"
            >
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-slate-300 hover:text-white transition-colors duration-200 py-2 border-b border-slate-800 hover:border-[#6EE7FF]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-6">
                  {isLoggedIn ? (
                    <Button
                      className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white"
                      onClick={() => {
                        setIsOpen(false);
                        onNavigateToDashboard();
                      }}
                    >
                      Dashboard
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-slate-700 text-white hover:bg-white/10"
                        onClick={() => {
                          setIsOpen(false);
                          onNavigateToLogin();
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-[#8A2BE2] to-purple-600 hover:from-[#7B24D1] hover:to-purple-700 text-white"
                        onClick={() => {
                          setIsOpen(false);
                          onNavigateToLogin();
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
