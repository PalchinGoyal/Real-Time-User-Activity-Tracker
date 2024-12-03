// import { ChatGroq } from "@langchain/groq";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import "dotenv/config"
// // require('dotenv').config()
// // llama3-8b-8192

// const model = new ChatGroq({
//   apiKey: process.env.GROQ_API_KEY,
//   model: "llama3-8b-8192",
// });

// const prompt = ChatPromptTemplate.fromMessages([
//   [
//     "system", 
//     `
//     I would provide you  this information about the user interaction with a website, the numbers 
//     in front of keywords represent the number of times either the word is cliked or 
//     hoverd upon, based on this information, tell me where the user's attention is most 
//     focused on and what he is finding on the website, and all such other information
//     `
//   ],
//   ["human", "{input}"],
// ]);

// const chain = prompt.pipe(model);
// const response = await chain.invoke({
//   input: "Hello",
// });

// console.log("response", response);

