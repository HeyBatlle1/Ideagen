import React from 'react';
import { GeneratedIdea } from '../../types';
import { useVoting } from './useVoting';

interface IdeaDisplayProps {
  idea: GeneratedIdea;
}

export const IdeaDisplay: React.FC<IdeaDisplayProps> = ({ idea }) => {
  const { handleVote, error } = useVoting();

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium">Generated Idea:</h3>
      <p className="mt-2">{idea.content}</p>
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => handleVote(idea.id, 'up')}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          👍 {idea.upvotes}
        </button>
        <button
          onClick={() => handleVote(idea.id, 'down')}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          👎 {idea.downvotes}
        </button>
      </div>
    </div>
  );
};