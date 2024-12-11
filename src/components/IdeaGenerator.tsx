import React, { useState } from 'react';
import { IdeaInput, GeneratedIdea } from '../types';
import { apiService } from '../services/api';

export const IdeaGenerator: React.FC = () => {
  const [input, setInput] = useState<IdeaInput>({ topic: '', description: '' });
  const [idea, setIdea] = useState<GeneratedIdea | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const generatedIdea = await apiService.generateIdea(input);
      setIdea(generatedIdea);
    } catch (error) {
      console.error('Error generating idea:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Ideas</h2>
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
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Generating...' : 'Generate Idea'}
        </button>
      </form>
      {idea && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium">Generated Idea:</h3>
          <p className="mt-2">{idea.content}</p>
          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={() => apiService.updateIdeaVotes(idea.id, 'up')}
              className="text-green-600 hover:text-green-700"
            >
              👍 {idea.upvotes}
            </button>
            <button
              onClick={() => apiService.updateIdeaVotes(idea.id, 'down')}
              className="text-red-600 hover:text-red-700"
            >
              👎 {idea.downvotes}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};