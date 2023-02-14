import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY
});

const openai = new OpenAIApi(configuration);

const generateBio = async (prompt: string) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Write a short bio from the prompt written in first person: "${prompt}"`,
    max_tokens: 200
  });
  return completion.data;
};

export { generateBio };
