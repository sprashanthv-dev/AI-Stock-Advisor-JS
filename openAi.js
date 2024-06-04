import OpenAI from "openai";
import {APP_SECRETS} from "./secrets.js";

// Setup our messages array
const messages = [
    {
        role: "system",
        content: "You are a helpful general knowledge expert."
    },
    {
        role: "user",
        content: "Who invented the television?"
    }
]

// Setup OpenAI class
const openAi = new OpenAI({
   apiKey: APP_SECRETS.OPEN_AI_API_KEY
});

// Invoke the API (Chat completions endpoint)
const response = await openAi.chat.completions.create({
    model: "gpt-4",
    messages
})

console.log(response);

/**
 * Sample Response:
 * {id: "chatcmpl-8Go69bvmGWV8JHvZ9uxYXSUAimEb8", object: "chat.completion", created: 1699016517, model: "gpt-4-0613", choices: [{index: 0, message: {role: "assistant", content: "The invention of television was the work of many individuals in the late 19th century and early 20th century. However, Scottish engineer John Logie Baird is often associated with creating the first mechanical television. He demonstrated his working device in January 1926 in London. Concurrently in the United States, Philo Farnsworth is credited with inventing the first fully electronic television in the late 1920s."}, finish_reason: "stop"}], usage: {prompt_tokens: 24, completion_tokens: 86, total_tokens: 110}}
 */

