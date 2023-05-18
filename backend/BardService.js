import { Bard } from "googlebard";
import dotenv from 'dotenv';

dotenv.config();

const bard = new Bard(process.env.BARD_API_KEY, {

});

async function BardResponse(prompt) {
    let response = await bard.ask(prompt);
    console.log("BARD: ", response);
    console.log(" ");
    return response;
  }

export { BardResponse };