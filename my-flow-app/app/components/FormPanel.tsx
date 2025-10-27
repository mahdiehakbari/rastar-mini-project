'use client';

import React from 'react';
import { Node } from 'reactflow';

interface FormPanelProps {
  selectedNode: Node | null;
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const FormPanel: React.FC<FormPanelProps> = ({
  selectedNode,
  formData,
  setFormData,
}) => {
  if (!selectedNode)
    return (
      <div className='p-4 text-black'>
        روی یک نود کلیک کنید تا مقدارش را وارد کنید
      </div>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [selectedNode.id]: e.target.value });
  };

  return (
    <div className='p-4 bg-white shadow-md rounded-md space-y-4 w-72'>
      <h3 className='font-bold text-lg text-black'>
        {selectedNode.data.label}
      </h3>
      <input
        type='text'
        value={formData[selectedNode.id] || ''}
        onChange={handleChange}
        className='text-black w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300'
        placeholder='مقدار را وارد کنید'
      />
    </div>
  );
};

export default FormPanel;
