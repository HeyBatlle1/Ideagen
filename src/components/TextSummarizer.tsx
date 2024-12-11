import React, { useState } from 'react';
import { TextSummary } from '../types';
import { apiService } from '../services/api';

export const TextSummarizer: React.FC = () => {
  const [text, setText] = useState('');
  const [ratio, setRatio] = useState(0.3);
  const [summary, setSummary] = useState<TextSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const summarizeText = async () => {
    setLoading(true);
    try {
      const result = await apiService.summarizeText(text, ratio);
      setSummary(result);
    } catch (error) {
      console.error('Error summarizing text:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Text Summarizer</h2>
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={8}
          placeholder="Enter text to summarize..."
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Summary Ratio: {ratio}
          </label>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.1"
            value={ratio}
            onChange={(e) => setRatio(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <button
          onClick={summarizeText}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
        >
          {loading ? 'Summarizing...' : 'Summarize Text'}
        </button>
      </div>
      {summary && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium">Summary:</h3>
          <p className="mt-2">{summary.summary}</p>
          <p className="mt-2 text-sm text-gray-500">
            Compression ratio: {Math.round((1 - summary.ratio) * 100)}%
          </p>
        </div>
      )}
    </div>
  );
};