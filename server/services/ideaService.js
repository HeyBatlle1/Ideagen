import natural from 'natural';
import { sentiment } from './sentimentService.js';

// In-memory store (replace with database in production)
const ideas = new Map();

export const ideaService = {
  generateIdea: (topic, description) => {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(`${topic} ${description}`);
    const keywords = tokens.filter(word => word.length > 3);
    
    const idea = {
      id: Date.now().toString(),
      content: `Here's an idea related to ${topic}: Consider ${keywords[Math.floor(Math.random() * keywords.length)]} 
                in combination with ${keywords[Math.floor(Math.random() * keywords.length)]} to create an innovative solution.`,
      sentiment: sentiment.analyze(description).score,
      upvotes: 0,
      downvotes: 0
    };
    
    ideas.set(idea.id, idea);
    return idea;
  },

  updateVotes: (id, voteType) => {
    const idea = ideas.get(id);
    if (!idea) {
      throw new Error('Idea not found');
    }
    
    if (voteType === 'up') {
      idea.upvotes++;
    } else if (voteType === 'down') {
      idea.downvotes++;
    }
    
    ideas.set(id, idea);
    return idea;
  }
};