"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ChevronRight, ChevronLeft,  Brain, Bot, Settings, Database } from "lucide-react";

function Page() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "I'm Verto, the aggregator of the agents. Please ask me whatever you wish, related to your wallet",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setIsLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const sidebarFeatures = [
    { name: "Neural Training", icon: <Brain size={20} />, beta: true },
    { name: "Flow Builder", icon: <Bot size={20} />, beta: true },
    { name: "Vector Store", icon: <Database size={20} />, beta: true },
    { name: "Agent Config", icon: <Settings size={20} />, beta: true },
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? "280px" : "0px",
          opacity: isSidebarOpen ? 1 : 0
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200
        }}
        className="relative h-full bg-zinc-900/50 backdrop-blur-xl border-r border-zinc-800/50 overflow-hidden"
      >
        <div className="p-6 space-y-8">
          {/* Logo Section */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-2xl font-bold text-blue-500">
              Verto AI
            </span>
          </motion.div>
          
          {/* Features Section */}
          <div className="space-y-2">
            {sidebarFeatures.map((feature, index) => (
              <motion.button
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                disabled
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl 
                  bg-gradient-to-r from-zinc-800/50 to-zinc-800/30
                  hover:from-zinc-800/70 hover:to-zinc-800/50
                  border border-zinc-700/30 backdrop-blur-sm
                  text-zinc-400 cursor-not-allowed group transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                  className="text-blue-500/50 group-hover:text-blue-500/70 transition-colors"
                >
                  {feature.icon}
                </motion.div>
                <span className="group-hover:text-zinc-300 transition-colors">{feature.name}</span>
                {feature.beta && (
                  <span className="ml-auto text-[10px] font-medium bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                    BETA
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Version Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 left-6 text-xs text-zinc-500"
          >
            Version 0.1.0 Alpha
          </motion.div>
        </div>
      </motion.div>

      {/* Toggle Sidebar Button */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-[280px] top-6 z-10 p-2 bg-zinc-800/50 backdrop-blur-sm rounded-full 
          border border-zinc-700/50 text-blue-500/70 hover:text-blue-500 transition-colors"
      >
        {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </motion.button>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        <div className="flex justify-end p-4 border-b border-zinc-800">
          <WalletMultiButton
            style={{
              backgroundColor: "#18181b",
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          />
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-blue-500/10 text-white"
                      : "bg-zinc-800/50 text-white"
                  }`}
                >
                  <ReactMarkdown className="text-sm md:text-base">
                    {message.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] rounded-lg p-4 bg-zinc-800/50">
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse">Thinking</div>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 bg-zinc-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 border border-zinc-700"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 transition-opacity hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
