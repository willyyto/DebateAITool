import { ChatGPTUnofficialProxyAPI  } from "chatgpt";
import dotenv from 'dotenv';

dotenv.config();

const chatgpt = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.CHATGPT_API_KEY,
	apiReverseProxyUrl: 'https://ai.fakeopen.com/api/conversation'
  })

const timeout = () => new Promise(res => setTimeout(res, 5000));

async function InitialiseChatGpt() {
	const ChatGptInitialScript = "Answer the topic or response for a debate.";
    let initialconversation = await chatgpt.sendMessage(ChatGptInitialScript);
	const parentid = initialconversation.parentMessageId;
	const conversationid = initialconversation.conversationId;
    // return as an array
    return [parentid, conversationid];
}
const chatgpt0 = await InitialiseChatGpt();
const parentid = chatgpt0[0];
const conversationid = chatgpt0[1];

const chatgpt1 = await InitialiseChatGpt();
const parentid1 = chatgpt1[0];
const conversationid1 = chatgpt1[1];
timeout();

const chatgpt2 = await InitialiseChatGpt();
const parentid2 = chatgpt2[0];
const conversationid2 = chatgpt2[1];

async function ChatGPTResponse(prompt, parentid, conversationid) {
	let response = await chatgpt.sendMessage(prompt, {
		conversationId: conversationid,
		parentMessageId: parentid
	  });
	return response.text;
}

async function ChatGPTResponse0(prompt) {
	return await ChatGPTResponse(prompt, parentid, conversationid);
}

async function ChatGPTResponse1(prompt) {
	return await ChatGPTResponse(prompt, parentid1, conversationid1);
}

async function ChatGPTResponse2(prompt) {
	return await ChatGPTResponse(prompt, parentid2, conversationid2);
}

export { ChatGPTResponse0, ChatGPTResponse1, ChatGPTResponse2 };
