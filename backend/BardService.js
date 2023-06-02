import { Bard } from "googlebard";
import dotenv from 'dotenv';

dotenv.config();

const generateRandomString = length => [...Array(length)].map(() => Math.random().toString(36)[2]).join('');

const bard = new Bard(process.env.BARD_API_KEY, {});

function InitialiseBard() {
	return generateRandomString(15);
}

const bard0 = InitialiseBard();
const bard1 = InitialiseBard();
const bard2 = InitialiseBard();

async function BardResponse(prompt, conversationId) {
    return await bard.ask(prompt, conversationId);
}

async function BardResponse0(prompt) {
  return await BardResponse(prompt, bard0);
}

async function BardResponse1(prompt) {
  return await BardResponse(prompt, bard1);
}

async function BardResponse2(prompt) {
  return await BardResponse(prompt, bard2);
}

export { BardResponse0, BardResponse1, BardResponse2 };