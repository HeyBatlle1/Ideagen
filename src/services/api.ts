import axios, { AxiosError } from 'axios';
import { IdeaInput, GeneratedIdea, SentimentResult, TextSummary } from '../types';

const API_URL = 'http://localhost:3000/api';

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    throw new Error(
      axiosError.response?.data?.error || 
      axiosError.message || 
      'An unexpected error occurred'
    );
  }
  throw error;
};

export const apiService = {
  generateIdea: async (input: IdeaInput): Promise<GeneratedIdea> => {
    try {
      const response = await axios.post(`${API_URL}/ideas/generate`, input);
      return response.data;
    } catch (error) {
      handleApiError(error);
      // TypeScript needs a return type for all code paths
      throw error;
    }
  },

  updateIdeaVotes: async (ideaId: string, voteType: 'up' | 'down'): Promise<GeneratedIdea> => {
    try {
      const response = await axios.post(`${API_URL}/ideas/${ideaId}/vote`, { voteType });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  analyzeSentiment: async (text: string): Promise<SentimentResult> => {
    try {
      const response = await axios.post(`${API_URL}/analyze/sentiment`, { text });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  summarizeText: async (text: string, ratio: number = 0.3): Promise<TextSummary> => {
    try {
      const response = await axios.post(`${API_URL}/analyze/summarize`, { text, ratio });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
};