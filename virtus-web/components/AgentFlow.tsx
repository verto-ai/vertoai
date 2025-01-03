'use client'

import React from 'react'
import ReactFlow, {
  Node,
  Edge,
  Background,
  MarkerType,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import AgentCard from './AgentCard'

const initialNodes: Node[] = [
  {
    id: 'root',
    type: 'agentCard',
    position: { x: 0, y: 0 },
    data: { 
      label: 'Core Orchestrator', 
      description: 'Coordinates agent network and manages workflows' 
    },
  },
  {
    id: 'portfolio',
    type: 'agentCard',
    position: { x: -200, y: -200 },
    data: { 
      label: 'Portfolio Sentinel', 
      description: 'Monitors assets and optimizes allocations' 
    },
  },
  {
    id: 'trading',
    type: 'agentCard',
    position: { x: 200, y: -200 },
    data: { 
      label: 'Trading Navigator', 
      description: 'Executes strategies and manages positions' 
    },
  },
  {
    id: 'search',
    type: 'agentCard',
    position: { x: -200, y: 200 },
    data: { 
      label: 'Market Explorer', 
      description: 'Analyzes trends and discovers opportunities' 
    },
  },
  {
    id: 'teach',
    type: 'agentCard',
    position: { x: 200, y: 200 },
    data: { 
      label: 'Knowledge Architect', 
      description: 'Builds and shares trading insights' 
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'e-root-portfolio', source: 'root', target: 'portfolio', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-root-trading', source: 'root', target: 'trading', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-root-search', source: 'root', target: 'search', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e-root-teach', source: 'root', target: 'teach', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
]

const nodeTypes = {
  agentCard: AgentCard,
}

export default function AgentFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    console.log('clicked node:', node)
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        snapToGrid={false}
        snapGrid={[15, 15]}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultViewport={{ zoom: 1, x: 0, y: 0 }}
        minZoom={1}
        maxZoom={1}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        onNodeClick={onNodeClick}
        className="bg-background"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#666" gap={16} />
      </ReactFlow>
    </div>
  )
}

