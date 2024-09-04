const OpenAI = require('openai');

const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama',
    dangerouslyAllowBrowser: true
});
const getMsg = (msg , onData) =>
    openai.chat.completions.create({
        model: 'llama3.1',
        stream: true,
        messages: [{role: 'user', content: msg}],
    }).then(res => {
        console.log(res.controller);
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");

        const read = () => {
            reader.read().then(({done,value}) => {
                if(done) return;

                const chunk =  decoder.decode(value , {stream :true});
                const lines = chunk.split('\n').filter(line => line.trim() !== '');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.replace(/^data: /, '');
                        if (data === '[DONE]') {
                            return;
                        }
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0]?.delta?.content;
                            if (content) {
                                onData(content);
                            }
                        } catch (error) {
                            console.error('Error parsing chunk', error);
                        }
                    }
                }

                read();
            })
        }
        read();

    });

module.exports = getMsg;
