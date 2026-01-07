import express, { json } from "express";
import { requestToSend } from "./dataProcessingService.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(json());

app.get("/", (_, response) => response.sendFile("index.html"));

// 언어 감지
app.post("/chat", async (request, response) => {
    const description = request.body;
    const result = requestToSend(description);
    return result;
});

app.listen(PORT, () =>
    console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`)
);
