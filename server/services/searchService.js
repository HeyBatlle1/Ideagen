import natural from 'natural';

const tfidf = new natural.TfIdf();
const tokenizer = new natural.WordTokenizer();

// In-memory search index (replace with proper search engine in production)
const documents = new Map();

export const searchService = {
  addDocument: (id, content) => {
    documents.set(id, content);
    tfidf.addDocument(content);
  },
  
  search: (query) => {
    const queryTokens = tokenizer.tokenize(query);
    const results = [];
    
    documents.forEach((content, id) => {
      let score = 0;
      queryTokens.forEach(token => {
        score += tfidf.tfidf(token, Array.from(documents.values()).indexOf(content));
      });
      
      if (score > 0) {
        results.push({
          id,
          content: content.slice(0, 200) + '...', // Preview
          score
        });
      }
    });
    
    return results.sort((a, b) => b.score - a.score);
  }
};