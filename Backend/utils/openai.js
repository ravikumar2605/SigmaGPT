import "dotenv/config";

const getAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          content: message,
          role: "user",
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
};

export default getAIAPIResponse;
