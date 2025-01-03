"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Send,
  PieChart,
  TrendingUp,
  Newspaper,
  Brain,
  GraduationCap,
  Menu,
  Twitter,
  Github,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "reactflow/dist/style.css";
import AgentFlow from "@/components/AgentFlow";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Send,
    title: "Smart Transactions",
    description:
      "Execute and verify blockchain transactions with intelligent assistance and clear explanations.",
  },
  {
    icon: PieChart,
    title: "Portfolio Analytics",
    description:
      "Advanced portfolio tracking with AI-powered insights and performance metrics.",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description:
      "Real-time market analysis with predictive insights and trend identification.",
  },
  {
    icon: Newspaper,
    title: "Ecosystem Updates",
    description:
      "Curated news and updates from across the blockchain ecosystem.",
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description:
      "Personalized investment suggestions based on market conditions and risk profile.",
  },
  {
    icon: GraduationCap,
    title: "Learning Hub",
    description:
      "Interactive educational resources to master blockchain concepts and strategies.",
  },
];



const roadmapItems = [
  {
    quarter: "Q2 2024",
    title: "Platform Launch",
    items: [
      "Beta release of Verto AI platform",
      "Community building and social presence",
      "Initial partnership announcements",
    ],
  },
  {
    quarter: "Q3 2024",
    title: "Token Launch & Ecosystem",
    items: [
      "VIRT token launch and distribution",
      "Governance mechanism implementation",
      "Enhanced AI capabilities rollout",
    ],
  },
  {
    quarter: "Q4 2024",
    title: "Platform Expansion",
    items: [
      "Cross-chain integration support",
      "Advanced portfolio analytics",
      "Mobile app development",
    ],
  },
  {
    quarter: "Q1 2025",
    title: "Enterprise Solutions",
    items: [
      "Institution-grade features",
      "API access for developers",
      "Enhanced security protocols",
    ],
  },
];

// Add this CSS to your global styles or component
const styles = `
  @keyframes flow {
    from {
      stroke-dashoffset: 24;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .animate-flow {
    stroke-dasharray: 12 12;
    animation: flow 1s linear infinite;
  }
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div
      className="min-h-screen w-full bg-background relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid opacity-25"></div>
      <div className="fixed inset-0 bg-dots opacity-20"></div>
      <div className="fixed inset-0 bg-glow"></div>

      {/* Floating orbs */}
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="fixed top-1/2 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="fixed -bottom-20 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed w-full z-50 px-4 py-3 nav-blur">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-10 h-10 animated-gradient-border">
                <div className="absolute inset-[1px] bg-white rounded-lg flex items-center justify-center">
                  <motion.div
                    className="text-xl font-bold text-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    V
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold hero-gradient">Verto</span>
                <span className="text-xs text-muted-foreground font-medium">
                  AI Platform
                </span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {["Capabilities", "Network", "Roadmap"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3"
              >
                {[
                  { icon: Twitter, href: "https://x.com/vertoAi" },
                  { icon: Github, href: "https://github.com/verto-ai" },
                ].map(({ icon: Icon, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    className="p-2 rounded-lg hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
              <motion.button
                onClick={() => router.push("/app")}
                className="button-glow px-6 py-2.5 bg-primary text-white rounded-lg font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Launch App
              </motion.button>
            </div>

            <motion.button
              className="md:hidden text-foreground p-2 hover:bg-primary/10 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-[60px] p-4 bg-background/80 backdrop-blur-lg border-b border-border md:hidden z-40"
            >
              <div className="flex flex-col gap-4">
                {["Capabilities", "Network", "Roadmap"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="px-4 py-2 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex gap-4 px-4 py-2">
                  {[
                    { icon: Twitter, href: "https://x.com/vertoAi" },
                    { icon: Github, href: "https://github.com/verto-ai" },
                  ].map(({ icon: Icon, href }) => (
                    <a
                      key={href}
                      href={href}
                      className="p-2 rounded-lg hover:bg-primary/10 text-foreground/80 hover:text-primary transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative">
          {/* Hero Section */}
          <div className="min-h-screen flex items-center justify-center section-padding container-padding">
            <motion.div
              style={{ opacity, scale }}
              className="max-w-[1200px] mx-auto text-center relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <span className="text-sm md:text-base font-semibold text-primary px-4 py-2 rounded-full bg-primary/10 mb-6 inline-block">
                  Revolutionizing Blockchain Intelligence
                </span>
              </motion.div>
              <h1 className="hero-gradient hero-text-shadow mb-6">
                Intelligence Meets Blockchain
              </h1>
              <p className="text-muted-foreground font-medium max-w-2xl mx-auto mb-12">
                Experience the future of blockchain interaction with Verto AI
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => router.push("/app")}
                  whileHover={{ scale: 1.02 }}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-primary/90 flex items-center gap-2"
                >
                  Launch Platform <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.a
                  href="/verto_whitepaper.pdf"
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  className="px-8 py-3 bg-background border border-border rounded-lg text-sm font-medium transition-colors hover:bg-card flex items-center gap-2"
                >
                  Whitepaper <FileText className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Agent Network Section */}
          <section id="network" className="section-padding hidden md:block">
            <div className="max-w-[1200px] mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mb-8"
              >
                Agent Network
              </motion.h2>
              <div className="rounded-xl h-[600px]">
                <AgentFlow />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="capabilities" className="section-padding">
            <div className="max-w-[1200px] mx-auto container-padding">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mb-16"
              >
                Capabilities
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 md:p-8 rounded-xl relative"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                      }}
                    >
                      <div className="flex items-center mb-8">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>

                      <h3 className="mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section id="roadmap" className="section-padding bg-card">
            <div className="max-w-[1200px] mx-auto container-padding">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mb-16"
              >
                Development Roadmap
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {roadmapItems.map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 md:p-8 rounded-xl relative"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                      }}
                    >
                      <div className="text-primary font-semibold mb-3">
                        {item.quarter}
                      </div>
                      <h3 className="mb-6">{item.title}</h3>
                      <ul className="space-y-3">
                        {item.items.map((listItem, i) => (
                          <li
                            key={i}
                            className="text-muted-foreground flex items-start gap-3"
                          >
                            <ArrowRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                            <span>{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <div className="section-padding">
            <div className="max-w-xl mx-auto container-padding text-center">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mb-6"
              >
                Stay Updated
              </motion.h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter for the latest updates and
                announcements.
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="py-16 md:py-24 bg-card border-t border-border">
        <div className="max-w-[1200px] mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Verto AI</h3>
              <p className="text-sm text-muted-foreground">
                Building the future of blockchain intelligence with AI.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/verto_whitepaper.pdf"
                    target="_blank"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a
                    href="/docs"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/discord"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/vertoAi"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/verto-ai"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Verto AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
