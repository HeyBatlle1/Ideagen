import { useState } from 'react';
import { IdeaInput, GeneratedIdea } from '../../types';
import { apiService } from '../../services/api';

export const useIdeaGenerator = () => {
  const [idea, setIdea] = useState<GeneratedIdea | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: IdeaInput) => {
    setLoading(true);
    setError(null);
    try {
      const generatedIdea = await apiService.generateIdea(input);
      setIdea(generatedIdea);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate idea';
      setError(errorMessage);
      console.error('Error generating idea:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    idea,
    loading,
    error,
    handleSubmit
  };
};