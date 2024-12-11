import React, { useState } from 'react';
import { SentimentResult } from '../types';
import { apiService } from '../services/api';

export const SentimentAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    setLoading(true);
    try {
      const analysis = await apiService.analyzeSentiment(text);
      setResult(analysis);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Sentiment Analysis</h2>
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={6}
          placeholder="Enter text to analyze..."
        />
        <button
          onClick={analyzeSentiment}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium">Analysis Results:</h3>
          <div className="mt-2 space-y-2">
            <p>Score: {result.score}</p>
            <p>Comparative: {result.comparative}</p>
            <div>
              <p className="font-medium">Positive Words:</p>
              <p className="text-green-600">{result.positive.join(', ')}</p>
            </div>
            <div>
              <p className="font-medium">Negative Words:</p>
              <p className="text-red-600">{result.negative.join(', ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};