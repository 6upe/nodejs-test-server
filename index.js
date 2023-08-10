const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();

// Set up CORS headers middleware

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/extractor', (req, res) => {
    res.sendFile(__dirname + '/extractor.html');
});

app.get('/kwizme', (req, res) => {
    res.sendFile(__dirname + '/kwizme.html');
});

app.get('/api/procurement-adverts', (req, res) => {
    const adverts = [
        {
            advertID: "1",
            advertTitle: "Job Oppotunity: Software Developer",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (1).jpg"
        },
        {
            advertID: "2",
            advertTitle: "Tender: Renovation of Ablution Block",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (2).jpg"
        },
        {
            advertID: "3",
            advertTitle: "Supplier Registration",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (3).jpg"
        },
        {
            advertID: "4",
            advertTitle: "Contract Awards",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (4).jpg"
        },
    ];

    res.json(adverts);
});

const { pipeline } = require('@transformers/pipeline');
const { Tokenizer } = require('@tokenizers/nltk');
const { AutoModelForQuestionAnswering, AutoTokenizer } = require('@transformers/node');
const { Tensor } = require('node-cuda-api').internal;
// or const { Tensor } = require('node-cuda-api').internal;

const model_name = 't5-base';
const tokenizer = new Tokenizer({ modelType: model_name });
const generator = pipeline('text2text-generation', { model: model_name, tokenizer });

const qa_model_name = 'bert-large-uncased-whole-word-masking-finetuned-squad';
const qa_tokenizer = AutoTokenizer.fromPretrained(qa_model_name);

const qa_model = AutoModelForQuestionAnswering.fromPretrained(qa_model_name);


app.post('/generate-quiz', async (req, res) => {
    const { text } = req.body;

    // Generate candidate questions using the language model
    const questions = await generator(`generate question: ${text}`, { max_length: 128, num_return_sequences: 5 });
    const candidateQuestions = questions.map(q => q.generated_text.replace('generate question:', '').trim());

    // Extract potential answers using the question answering model
    const answers = [];
    for (const question of candidateQuestions) {
        const inputs = qa_tokenizer.encodePlus(question, text);
        const output = await qa_model(inputs.input_ids, inputs.attention_mask);
        const start_logits = output.start_logits[0];
        const end_logits = output.end_logits[0];
        const all_tokens = qa_tokenizer.convertIdsToTokens(inputs.input_ids);
        const answer = qa_tokenizer.decode(all_tokens.slice(start_logits, end_logits + 1)).trim();
        answers.push(answer);
    }

    // Combine questions and answers to create quiz questions
    const quizQuestions = candidateQuestions.map((question, i) => `What is ${answers[i]} in the context of: ${question}?`);

    res.send(quizQuestions);
});

  

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server has started on port ${port}`);
});
