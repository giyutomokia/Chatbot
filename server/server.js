// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://lasya:lasya@cluster0.dlr7tet.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
});

const ChatMessage = mongoose.model('ChatMessage', {
  text: String,
  sender: String,
  createdAt: { type: Date, default: Date.now }
});

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  const { question, answer } = await generateBotAnswer(userMessage);

  const userChatMessage = new ChatMessage({ text: question, sender: 'user' });
  await userChatMessage.save();

  const botChatMessage = new ChatMessage({ text: answer, sender: 'bot' });
  await botChatMessage.save();

  const chatHistory = [
    { text: question, sender: 'user' },
    { text: answer, sender: 'bot' }
  ];


  res.json({latestMessage: { text: answer, sender: 'bot' } });
});

async function generateBotAnswer(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();
  let botResponse;

  if (lowerCaseMessage.includes('hi')|| lowerCaseMessage.includes('hello') ) {
    botResponse = 'Hello! How can I assist you today?';
  } else if (lowerCaseMessage.includes('product')) {
    botResponse = 'We offer a range of innovative products. What specific product are you interested in?';
  } else if (lowerCaseMessage.includes('contact')) {
    botResponse = 'You can contact us at contact@sciastra.com. We look forward to hearing from you!';
  } else if (lowerCaseMessage.includes('who is sciastra')) {
    botResponse = 'SciAstra is a cutting-edge technology company specializing in [describe the core focus or services of SciAstra].';
  } else if (lowerCaseMessage.includes('what does sciastra do')) {
    botResponse = 'SciAstra is dedicated to [briefly describe SciAstra\'s main activities or services].';
  } else if (lowerCaseMessage.includes('where is sciastra located')) {
    botResponse = 'SciAstra is located in [mention the location of SciAstra\'s headquarters or main office].';
  } else if (lowerCaseMessage.includes('how can I join sciastra')) {
    botResponse = 'To explore career opportunities at SciAstra, please visit our Careers page on the official website.';
  } else if (lowerCaseMessage.includes('what technologies does sciastra use')) {
    botResponse = 'SciAstra leverages [mention key technologies or frameworks that SciAstra uses] for its projects.';
  } else if (lowerCaseMessage.includes('tell me about sciastra\'s team')) {
    botResponse = 'SciAstra is proud to have a talented and diverse team of professionals with expertise in [mention relevant areas].';
  } else if (lowerCaseMessage.includes('can I collaborate with sciastra')) {
    botResponse = 'SciAstra is always open to collaborations. If you have a proposal, please reach out to us at partnerships@sciastra.com.';
  } else if (lowerCaseMessage.includes('what industries does sciastra serve')) {
    botResponse = 'SciAstra provides solutions for various industries, including [list some industries that SciAstra serves].';
  } else if (lowerCaseMessage.includes('tell me about sciastra\'s achievements')) {
    botResponse = 'SciAstra has achieved [mention some notable achievements or milestones] in its journey.';
  } else if (lowerCaseMessage.includes('how can I stay updated with sciastra')) {
    botResponse = 'Stay connected with SciAstra by following us on social media and subscribing to our newsletter on the official website.';
  } else if (lowerCaseMessage.includes('does sciastra offer training programs')) {
    botResponse = 'Yes, SciAstra provides training programs in [mention specific areas or technologies]. Explore our Training section on the website for more details.';
  } else if (lowerCaseMessage.includes('tell me about sciastra\'s mission')) {
    botResponse = 'SciAstra\'s mission is [describe the mission or vision statement of SciAstra].';
  } else if (lowerCaseMessage.includes('what sets sciastra apart')) {
    botResponse = 'SciAstra stands out for [highlight key factors that distinguish SciAstra, such as innovation, quality, etc.].';
  } else {
    botResponse = 'I apologize, but I am not sure how to respond to that. Please ask another question.';
  }
console.log('Bot Response:', botResponse);
  // Construct response with user's question and bot's answer
  const response = {
    question: userMessage,
    answer: botResponse,
  };

  return response;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
