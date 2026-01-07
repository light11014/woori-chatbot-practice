import superagent from "superagent";
import crypto from "crypto"
import dotenv from "dotenv";

dotenv.config();



const CLOVA_CHATBOT_URL = (process.env.CLOVA_CHATBOT_URL || '').trim();
const CLOVA_SECRET_KEY = (process.env.CLOVA_SECRET_KEY || '').trim();
function assertEnv() {
    if (!CLOVA_CHATBOT_URL || !CLOVA_SECRET_KEY) {
        throw new Error('Missing CLOVA_CHATBOT_URL or CLOVA_SECRET_KEY in .env');
    }
}

function makeSignature(requestBodyString) {
    return crypto
        .createHmac('sha256', CLOVA_SECRET_KEY)
        .update(requestBodyString, 'utf8')
        .digest('base64');
}

export async function callChatbot(payload) {
    assertEnv();
    if (!payload || typeof payload !== 'object') {
        throw new Error('payload must be a non-null object');
    }

    console.log(payload)
    const data = 
                {
                "version": "v2",
                "userId": "test-user-001",
                "userIp": "127.0.0.1",
                "timestamp": 1736210000000,
                "bubbles": [
                    payload
                ],
                "event": "send"
        }
    
    const requestBodyString = JSON.stringify(data);
    const signature = makeSignature(requestBodyString);

    const result = await superagent
        .post(CLOVA_CHATBOT_URL)
        .send(requestBodyString)
        .set('Content-Type', 'application/json; charset=UTF-8')
        .set('X-NCP-CHATBOT_SIGNATURE', signature)
        .accept('application/json')
        .timeout({ response: 10000, deadline: 15000 });

    return result.body;
}

