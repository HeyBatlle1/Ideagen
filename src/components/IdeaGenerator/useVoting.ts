import { useState } from 'react';
import { apiService } from '../../services/api';

export const useVoting = () => {
  const [error, setError] = useState<string | null>(null);

  const handleVote = async (ideaId: string, voteType: 'up' | 'down') => {
    setError(null);
    try {
      await apiService.updateIdeaVotes(ideaId, voteType);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update vote';
      setError(errorMessage);
      console.error('Error updating votes:', err);
    }
  };

  return { handleVote, error };
};