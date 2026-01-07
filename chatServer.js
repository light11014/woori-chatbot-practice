import express, { json } from "express";
import { requestToSend } from "./dataProcessingService.js";
import { callChatbot } from "./serverapi.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(json());

app.get("/", (_, response) => response.sendFile("index.html"));

// 언어 감지
app.post("/chat", async (request, response) => {
    const requestDescription = request.body.description;
    const processedData = await requestToSend(requestDescription);

    const result = await callChatbot(processedData);
    //console.log("result:", result);
    //   response = result;
    //   //console.log("response:") + response;
    //   const paredJson = JSON.parse(response);
    //   //console.log(paredJson);
    //   console.log(paredJson.title);
    //   console.log(paredJson.content);
    //   console.log(paredJson.keywords);
    //   //console.log(paredJson.keywords[0]);

    response.send(result);
});

app.listen(PORT, () =>
    console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`)
);
