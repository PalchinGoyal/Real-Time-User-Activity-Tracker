const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const { ChatGroq } = require('@langchain/groq');
const { ChatPromptTemplate } = require('@langchain/core/prompts');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
    You are a sales crawler tasked with tracking and analyzing every action a user takes when visiting a website. Your role is to provide a concise, clear, and insightful summary of what the user appeared most interested in, strictly based on the input data. Your output will be presented directly to the website owners, who are our paying clients. Ensure your summary is in simple, impactful language, highlighting key user interests effectively. Avoid unnecessary details and focus on delivering actionable insights.
    `
  ],
  ["human", "{input}"],
]);

let previousResponse = "";

app.post('/analyze', async (req, res) => {
  const { userInterests } = req.body;

  try {
    fs.writeFileSync('userInterests.txt', JSON.stringify(userInterests, null, 2), 'utf8');
    console.log('User interests data saved to userInterests.txt');

    const chain = prompt.pipe(model);
    const response = await chain.invoke({
      input: JSON.stringify({
        userInterests,
        previousResponse
      }),
    });

    previousResponse = response.text;

    console.log("LLM Response:", response);

    res.json({ response: response.text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
