import natural from 'natural';

const classifier = new natural.BayesClassifier();

// Train with some basic examples
const trainingData = [
  { text: "I love this product", category: "positive" },
  { text: "This is terrible", category: "negative" },
  { text: "Just okay", category: "neutral" },
  // Add more training data as needed
];

trainingData.forEach(item => {
  classifier.addDocument(item.text, item.category);
});

classifier.train();

export const textClassificationService = {
  classify: (text) => {
    const category = classifier.classify(text);
    const classifications = classifier.getClassifications(text);
    
    return {
      category,
      confidence: classifications.find(c => c.label === category)?.value || 0,
      allClassifications: classifications
    };
  }
};