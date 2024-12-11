import axios from 'axios';
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();

export const webScraperService = {
  extractContent: async (url) => {
    try {
      const response = await axios.get(url);
      const text = response.data.replace(/<[^>]*>/g, ' '); // Simple HTML stripping
      
      // Extract keywords using TF-IDF
      tfidf.addDocument(text);
      const keywords = [];
      tfidf.listTerms(0).slice(0, 10).forEach(item => {
        keywords.push({
          term: item.term,
          tfidf: item.tfidf
        });
      });
      
      return {
        url,
        text: text.slice(0, 1000), // First 1000 chars as preview
        keywords,
        extractedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to extract content: ${error.message}`);
    }
  }
};