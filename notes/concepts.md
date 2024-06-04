#### Introduction

 - Overall flow:
   - Stock Tickers -> Stock Price Data API (Last three days stock prices) -> OpenAI API -> Report
 - The OpenAI API basics:
   - Each request to the API requires a model and an array of messages as the required params
   - LLM (Large Language Model) is an algorithm that uses training data to recognize patterns and make predictions / decisions.
   - We will use the `gpt-4` model which is good at text generation
   - Messages array [Actually an array of objects]:
     - First param is the instruction / system object message
     - Second param is the user input
   - The OpenAI API returns back an `assistant` object which contains the AI output.
   - The OpenAI API is available as a library through npm
   - `Chat completions API` is the endpoint to use for any kind of text generation capabilities