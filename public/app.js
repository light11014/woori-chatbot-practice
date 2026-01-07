const inputTextarea = document.getElementById("input-textarea");
const sendButton = document.getElementById("send-btn");

sendButton.addEventListener("click", async () => {
  addMessage(inputTextarea.value, "user");
  inputTextarea.value = "";
  const result = await sendMessage(inputTextarea.value);
  //   addMessage(result, "bot");
});

const sendMessage = async (message) => {
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: message,
      }),
    });

    const data = await response.json();
    return data.description; // TODO : 추후 확인 필요
  } catch (error) {
    console.error("채팅 오류:", error);
    return null;
  }
};

const chatMessages = document.querySelector(".chat-messages");

function addMessage(text, type) {
  const message = document.createElement("div");
  message.classList.add("message", type); // type: 'user' | 'bot'
  message.textContent = text;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
