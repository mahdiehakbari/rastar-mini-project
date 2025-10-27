'use client';

import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import FormPanel from './components/FormPanel';

export default function Home() {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: '👋 Start Form' },
      position: { x: 50, y: 0 },
    },
    { id: '2', data: { label: '🧍 Name Field' }, position: { x: 50, y: 100 } },
    { id: '3', data: { label: '📧 Email Field' }, position: { x: 50, y: 200 } },
    {
      id: '4',
      data: { label: '💬 Message Field' },
      position: { x: 50, y: 300 },
    },
    {
      id: '5',
      type: 'output',
      data: { label: '✅ Submit' },
      position: { x: 50, y: 400 },
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleNodeClick = (_: React.MouseEvent, node: Node) =>
    setSelectedNode(node);

  return (
    <div className='flex h-screen'>
      {/* نودهای فلو */}
      <div className='flex-1 bg-gray-100'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={16} color='black' />
        </ReactFlow>
      </div>

      {/* فرم تعاملی */}
      <div className='w-80 bg-gray-50 border-l border-gray-200'>
        <FormPanel
          selectedNode={selectedNode}
          formData={formData}
          setFormData={setFormData}
        />

        {Object.keys(formData).length > 0 && (
          <div className='p-4'>
            <h4 className='font-bold mb-2'>Form Data Preview:</h4>
            <pre className='text-sm bg-gray-100 p-2 rounded text-black'>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
