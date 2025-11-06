import { Code2, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const links = {
    product: [
      { label: "Browse Prompts", href: "#prompts" },
      { label: "Categories", href: "#features" },
      { label: "Top Prompts", href: "#prompts" },
      { label: "Submit Prompt", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
    resources: [
      { label: "AI Models", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "API", href: "#" },
      { label: "Community", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#8A2BE2]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6EE7FF]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#8A2BE2] to-[#6EE7FF] rounded-lg shadow-lg">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl text-white">RapidPrompt</div>
                <div className="text-xs text-slate-400">AI-Powered Development</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Supercharge your development workflow with curated AI prompts. Join thousands of developers building better software faster.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-[#8A2BE2] hover:to-[#6EE7FF] text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#6EE7FF] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#6EE7FF] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#6EE7FF] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#6EE7FF] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2025 RapidPrompt. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-rose-500">♥</span>
            <span>for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
