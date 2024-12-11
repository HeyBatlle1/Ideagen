import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

// Train the classifier with some basic patterns
classifier.addDocument('hello hi hey', 'greeting');
classifier.addDocument('bye goodbye', 'farewell');
classifier.addDocument('help support assistance', 'help');
classifier.train();

export const chatbotService = {
  processMessage: (message) => {
    const tokens = tokenizer.tokenize(message.toLowerCase());
    const classification = classifier.classify(tokens.join(' '));
    
    const responses = {
      greeting: "Hello! How can I help you today?",
      farewell: "Goodbye! Have a great day!",
      help: "I can help you with: generating ideas, analyzing sentiment, and summarizing text.",
      default: "I'm not sure how to respond to that. Would you like to try generating an idea or analyzing some text?"
    };
    
    return responses[classification] || responses.default;
  }
};