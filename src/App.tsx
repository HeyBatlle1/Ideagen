import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { IdeaGenerator } from './components/IdeaGenerator';
import { SentimentAnalyzer } from './components/SentimentAnalyzer';
import { TextSummarizer } from './components/TextSummarizer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  Idea Generator
                </Link>
                <Link
                  to="/sentiment"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  Sentiment Analysis
                </Link>
                <Link
                  to="/summarize"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
                >
                  Text Summarizer
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<IdeaGenerator />} />
            <Route path="/sentiment" element={<SentimentAnalyzer />} />
            <Route path="/summarize" element={<TextSummarizer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;