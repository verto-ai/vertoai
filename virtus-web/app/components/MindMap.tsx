'use client'

import { motion } from 'framer-motion'
import { Send, PieChart, Newspaper, Brain, Bot, Network } from 'lucide-react'
import React from 'react'

interface AgentNode {
  icon: React.ElementType
  title: string
  description: string
  position: { x: number; y: number }
}

const agents: AgentNode[] = [
  {
    icon: Bot,
    title: 'Verto AI Core',
    description: 'Central AI chatbot coordinator',
    position: { x: 45, y: 35 },
  },
  {
    icon: Send,
    title: 'Transaction Agent',
    description: 'Handles on-chain transactions',
    position: { x: 20, y: 15 },
  },
  {
    icon: PieChart,
    title: 'Portfolio Agent',
    description: 'Tracks and analyzes holdings',
    position: { x: 65, y: 15 },
  },
  {
    icon: Newspaper,
    title: 'News Agent',
    description: 'Fetches latest updates',
    position: { x: 20, y: 55 },
  },
  {
    icon: Brain,
    title: 'Analysis Agent',
    description: 'Market insights and predictions',
    position: { x: 65, y: 55 },
  },
  {
    icon: Network,
    title: 'Network Agent',
    description: 'Inter-agent communication',
    position: { x: 40, y: 75 },
  },
]

const MindMap = () => {
  const createPath = (start: { x: number; y: number }, end: { x: number; y: number }, index: number) => {
    const midX = (start.x + end.x) / 2
    const midY = (start.y + end.y) / 2

    if (index === 5) {
      // Wavy line for Network Agent
      return `M ${start.x} ${start.y} 
              C ${start.x} ${midY},
                ${midX} ${midY + 5},
                ${end.x} ${end.y}`
    } else if (index === 1 || index === 3) {
      // Curve towards cards for left side
      return `M ${start.x} ${start.y} 
              C ${start.x - 10} ${start.y},
                ${end.x + 10} ${end.y},
                ${end.x} ${end.y}`
    } else {
      // Modified curve for right side
      return `M ${start.x} ${start.y} 
              C ${start.x + 10} ${start.y},
                ${end.x - 10} ${end.y},
                ${end.x + 20} ${end.y}`
    }
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#00FF94" />
          </linearGradient>
        </defs>
        
        {agents.slice(1).map((agent, index) => {
          const path = createPath(agents[0].position, agent.position, index + 1)
          
          return (
            <motion.path
              key={index}
              d={path}
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              style={{ 
                vectorEffect: 'non-scaling-stroke',
              }}
            />
          )
        })}
      </svg>

      {agents.map((agent, index) => {
        const Icon = agent.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute glass-card p-4 rounded-xl w-48 transform -translate-x-1/2 -translate-y-1/2 hover:bg-white/10 transition-colors cursor-pointer group border-[#00E5FF]/10 hover:border-[#00FF94]/20"
            style={{
              left: `${agent.position.x}%`,
              top: `${agent.position.y}%`,
              zIndex: index === 0 ? 10 : 1,
            }}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-6 h-6 text-[#00E5FF] group-hover:text-[#00FF94] transition-colors" />
              <h3 className="text-sm font-semibold text-foreground">{agent.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{agent.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

export default MindMap

