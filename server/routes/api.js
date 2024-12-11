import express from 'express';
import { ideaService } from '../services/ideaService.js';
import { sentiment } from '../services/sentimentService.js';
import { summarizerService } from '../services/summarizerService.js';
import { chatbotService } from '../services/chatbotService.js';
import { textClassificationService } from '../services/textClassificationService.js';
import { webScraperService } from '../services/webScraperService.js';
import { searchService } from '../services/searchService.js';

const router = express.Router();

// Idea Generation Routes
router.post('/ideas/generate', (req, res) => {
  const { topic, description } = req.body;
  const idea = ideaService.generateIdea(topic, description);
  res.json(idea);
});

router.post('/ideas/:id/vote', (req, res) => {
  try {
    const idea = ideaService.updateVotes(req.params.id, req.body.voteType);
    res.json(idea);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Sentiment Analysis Route
router.post('/analyze/sentiment', (req, res) => {
  const analysis = sentiment.analyze(req.body.text);
  res.json(analysis);
});

// Text Summarization Route
router.post('/analyze/summarize', async (req, res) => {
  try {
    const summary = await summarizerService.summarize(req.body.text, req.body.ratio);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Error generating summary' });
  }
});

// Chatbot Route
router.post('/chat', (req, res) => {
  const response = chatbotService.processMessage(req.body.message);
  res.json({ response });
});

// Text Classification Route
router.post('/classify', (req, res) => {
  const result = textClassificationService.classify(req.body.text);
  res.json(result);
});

// Web Scraping Route
router.post('/scrape', async (req, res) => {
  try {
    const content = await webScraperService.extractContent(req.body.url);
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search Routes
router.post('/search/index', (req, res) => {
  const { id, content } = req.body;
  searchService.addDocument(id, content);
  res.json({ message: 'Document indexed successfully' });
});

router.get('/search', (req, res) => {
  const results = searchService.search(req.query.q);
  res.json(results);
});

export default router;