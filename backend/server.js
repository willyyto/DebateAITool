import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ChatGPTResponse } from './ChatGPTService.js'
import { BardResponse } from './BardService.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins
      methods: ["GET", "POST"], // Allowed methods
    },
  });
const port = process.env.PORT || 3001;

dotenv.config();
app.use(cors()); 
app.use(express.json());

//Add Server routes here
io.on('connection', (socket) => {
    console.log('A new client connected');
    // Set up different socket events for different actions
    socket.on('debate', async (argument) => {
        const Debate_Topic = argument;
        let ChatGpt_Response = await ChatGPTResponse(Debate_Topic);
        let Bard_Response = await BardResponse(ChatGpt_Response);
        while (1) 
        {
            ChatGpt_Response = await ChatGPTResponse(Bard_Response);
            socket.emit('bardResponse', Bard_Response);
            Bard_Response = await BardResponse(ChatGpt_Response);
            socket.emit('chatgptResponse', ChatGpt_Response);
        }
    });

    socket.on('chatgpt', async (argument) => {
        const ChatGpt_Response = await ChatGPTResponse(argument);
        socket.emit('chatgptResponse', ChatGpt_Response);
    });

    socket.on('bard', async (argument) => {
        const Bard_Response = await BardResponse(argument);
        socket.emit('bardResponse', Bard_Response);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });

// // Add your API routes here
// app.listen(port, () => {
//    console.log(`Server is running on port ${port}`);
// });

app.post('/debate', express.json(), async (req, res) => {
    const Debate_Topic = req.body.topic;
    let ChatGpt_Response = await ChatGPTResponse(Debate_Topic);
    let Bard_Response = await BardResponse(ChatGpt_Response);
    while (1) 
    {
        ChatGpt_Response = await ChatGPTResponse(Bard_Response);
        Bard_Response = await BardResponse(ChatGpt_Response);
    }
    res.send({ Bard_Response });
});

app.post('/chatgpt', express.json(), async (req, res) => {
    const ChatGpt_Argument = req.body.argument;
    const ChatGpt_Response = await ChatGPTResponse(ChatGpt_Argument);
    res.send({ ChatGpt_Response });
});

app.post('/bard', express.json(), async (req, res) => {
    const Bard_Argument = req.body.argument;
    const Bard_Response = await BardResponse(Bard_Argument);
    res.send({ Bard_Response });
});


