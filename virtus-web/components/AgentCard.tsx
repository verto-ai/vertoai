import React, { memo } from 'react'
import { Handle, Position } from 'reactflow'

interface AgentCardProps {
  data: {
    label: string
    description: string
  }
}

function AgentCard({ data }: AgentCardProps) {
  return (
    <div className="bg-card p-3.5 rounded-lg border border-border shadow-sm min-w-[180px] hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/40">
      <Handle type="target" position={Position.Top} className="!bg-primary w-2.5 h-2.5" />
      <div className="space-y-1.5">
        <h3 className="text-sm text-primary font-medium">{data.label}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{data.description}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary w-2.5 h-2.5" />
    </div>
  )
}

export default memo(AgentCard)

