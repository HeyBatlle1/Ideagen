import React, { useState } from 'react';
import { IdeaInput } from '../../types';

interface IdeaFormProps {
  onSubmit: (input: IdeaInput) => Promise<void>;
  loading: boolean;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit, loading }) => {
  const [input, setInput] = useState<IdeaInput>({ topic: '', description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Topic</label>
        <input
          type="text"
          value={input.topic}
          onChange={(e) => setInput({ ...input, topic: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={input.description}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Idea'}
      </button>
    </form>
  );
};