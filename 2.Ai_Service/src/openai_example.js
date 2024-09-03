const OpenAI = require('openai');

const getMsg = async (msg) => {
    const openai = new OpenAI({
        baseURL: 'http://localhost:11434/v1',
        apiKey: 'ollama'
    });

    return (await openai.chat.completions.create({
        model: 'llama3.1',
        messages: [{ role: 'user', content: '안녕' }],
    }));
};

export default getMsg