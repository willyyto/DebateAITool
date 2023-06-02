import express from 'express'
import dotenv from 'dotenv';
import moment from 'moment';
import winston from 'winston';
import { ChatGPTResponse0, ChatGPTResponse1, ChatGPTResponse2 } from './ChatGPTService.js'
import { BardResponse0, BardResponse1, BardResponse2 } from './BardService.js';

const app = express();
const port = process.env.PORT || 3001;
const topic = "ProblemSolving_4.5";

dotenv.config();
app.use(express.json());

const timeout = () => new Promise(res => setTimeout(res, 5000));

async function Debate(debate_topic) 
{
    // Define the logger within the function to create a new instance each time
    let timestamp = moment().format('YYYY-MM-DD-HH-mm-ss');
    let logger = winston.createLogger({
        level: 'info',
        format: winston.format.printf(({ message }) => message),
        transports: [
            new winston.transports.File({ filename: `logs/${topic}_chatgptvsbard_${timestamp}.log` })
        ],
    });
    //Debate
    const Debate_Topic = debate_topic;
    logger.info(`Debate Topic: ${JSON.stringify(Debate_Topic)}`);
    let ChatGpt_Response = await ChatGPTResponse0(Debate_Topic);
    logger.info(`ChatGPT Response: ${JSON.stringify(ChatGpt_Response)}`);
    timeout();
    let Bard_Response = await BardResponse0(ChatGpt_Response);
    logger.info(`Bard Response: ${JSON.stringify(Bard_Response)}`);
    timeout();
    for (let i = 0; i < 5; i++) 
    {
        ChatGpt_Response = await ChatGPTResponse0(Bard_Response);
        logger.info(`ChatGPT Response: ${JSON.stringify(ChatGpt_Response)}`);
        timeout();
        Bard_Response = await BardResponse0(ChatGpt_Response);
        logger.info(`Bard Response: ${JSON.stringify(Bard_Response)}`);
        timeout();
    }
    return true
}

async function ChatGptDebate(debate_topic) 
{
    // Define the logger within the function to create a new instance each time
    let timestamp = moment().format('YYYY-MM-DD-HH-mm-ss');
    let logger = winston.createLogger({
        level: 'info',
        format: winston.format.printf(({ message }) => message),
        transports: [
            new winston.transports.File({ filename: `logs/${topic}_chatgpt_${timestamp}.log` })
        ],
    });
    //Debate
    const Debate_Topic = debate_topic;
    logger.info(`Debate Topic: ${JSON.stringify(Debate_Topic)}`);
    let ChatGpt_Response1 = await ChatGPTResponse1(Debate_Topic);
    logger.info(`ChatGPT1 Response: ${JSON.stringify(ChatGpt_Response1)}`);
    timeout();
    let ChatGpt_Response2 = await ChatGPTResponse2(ChatGpt_Response1);
    logger.info(`ChatGPT2 Response: ${JSON.stringify(ChatGpt_Response2)}`);
    timeout();
    for (let i = 0; i < 5; i++) 
    {
        ChatGpt_Response1 = await ChatGPTResponse1(ChatGpt_Response2);
        logger.info(`ChatGPT1 Response: ${JSON.stringify(ChatGpt_Response1)}`);
        timeout();
        ChatGpt_Response2 = await ChatGPTResponse2(ChatGpt_Response1);
        logger.info(`ChatGPT2 Response: ${JSON.stringify(ChatGpt_Response2)}`);
        timeout();
    }
    return true
}

async function BardDebate(debate_topic) 
{
    // Define the logger within the function to create a new instance each time
    let timestamp = moment().format('YYYY-MM-DD-HH-mm-ss');
    let logger = winston.createLogger({
        level: 'info',
        format: winston.format.printf(({ message }) => message),
        transports: [
            new winston.transports.File({ filename: `logs/${topic}_bard_${timestamp}.log` })
        ],
    });
    //Debate
    const Debate_Topic = debate_topic;
    logger.info(`Debate Topic: ${JSON.stringify(Debate_Topic)}`);
    let Bard_Response1 = await BardResponse1(Debate_Topic);
    logger.info(`Bard1 Response: ${JSON.stringify(Bard_Response1)}`);
    timeout();
    let Bard_Response2 = await BardResponse2(Bard_Response1);
    logger.info(`Bard2 Response: ${JSON.stringify(Bard_Response2)}`);
    timeout();
    for (let i = 0; i < 5; i++) 
    {
        Bard_Response1 = await BardResponse1(Bard_Response2);
        logger.info(`Bard1 Response: ${JSON.stringify(Bard_Response1)}`);
        timeout();
        Bard_Response2 = await BardResponse2(Bard_Response1);
        logger.info(`Bard2 Response: ${JSON.stringify(Bard_Response2)}`);
        timeout();
    }
    return true;
}

app.post('/all', express.json(), async (req, res) => {
    
    let result0 = await Debate(req.body.topic);
    let result1 = await ChatGptDebate(req.body.topic);
    let result2 = await BardDebate(req.body.topic);
    res.send(result0);
});

app.post('/debate', express.json(), async (req, res) => {
    
    let result = await Debate(req.body.topic);
    res.send(result);
});

app.post('/chatgpt', express.json(), async (req, res) => {
    
    let result = await ChatGptDebate(req.body.topic);
    res.send(result);
});

app.post('/bard', express.json(), async (req, res) => {
    
    let result = await BardDebate(req.body.topic);
    res.send(result);
});

// Add your API routes here
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });


