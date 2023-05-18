import { ChatGPTUnofficialProxyAPI  } from "chatgpt";
import dotenv from 'dotenv';

dotenv.config();
const ChatGptInitialScript = "Answer the topic or response in a way that create a debate.";

const chatgpt = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.CHATGPT_API_KEY,
	apiReverseProxyUrl: 'https://gpt.pawan.krd/backend-api/conversation'
  })

let initialresponse = await chatgpt.sendMessage(ChatGptInitialScript);

const parentid = initialresponse.parentMessageId;
const convoid = initialresponse.conversationId;

async function ChatGPTResponse(prompt) {
	let response = await chatgpt.sendMessage(prompt, {
		conversationId: convoid,
		parentMessageId: parentid
	  });
	console.log("CHATGPT: ",response.text);
	console.log(" ");
	return response.text;
}

export { ChatGPTResponse };
