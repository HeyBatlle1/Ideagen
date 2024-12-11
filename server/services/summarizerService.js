import { SummarizerManager } from 'node-summarizer';

const summarizer = new SummarizerManager();

export const summarizerService = {
  summarize: async (text, ratio) => {
    const summary = await summarizer.getSummaryByRatio(text, ratio);
    return {
      original: text,
      summary: summary.summary,
      ratio: ratio
    };
  }
};