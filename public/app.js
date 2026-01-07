const inputTextarea = document.getElementById("input-textarea");
const sendButton = document.getElementById("send-btn");

let keywords = [];

inputTextarea.addEventListener(
  "click",
  async () => {
    console.log("HI");
    addMessage(inputTextarea.value, "user");
    const result = await sendMessage("HI");
    addMessage(result.content, "bot");
    inputTextarea.value = "";
    result.keywords.forEach((element) => {
      console.log(element);
      keywords.push(element);
    });
  },
  { once: true }
);

sendButton.addEventListener("click", async () => {
  addMessage(inputTextarea.value, "user");
  const result = await sendMessage(inputTextarea.value);
  console.log(result);
  addMessage(result.content, "bot");
  inputTextarea.value = "";
});

const sendMessage = async (message) => {
  try {
    // message 가 keywords 없으면 예외 발생
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: message,
      }),
    };

    const response = await fetch("/chat", request);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("채팅 오류:", error);
    return null;
  }
};

const chatMessages = document.querySelector(".chat-messages");

function addMessage(text, type) {
  const message = document.createElement("div");
  message.classList.add("message", type); // user | bot

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.classList.add("glass-card");
  bubble.textContent = text;

  message.appendChild(bubble);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const autoCompleteArea = document.querySelector(".auto-complete-container");

let timerId;
inputTextarea.addEventListener("input", (event) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    // 1. 입력값 가져오기
    const text = event.target.value;

    // 2. 입력 값으로 시작하는지 확인
    const filteredList = keywords.filter((value) => value.startsWith(text));

    // 3. 렌더링
    renderKeywords(filteredList);
  }, 1000);
});

// 화면에 리스트를 그려주는 함수
function renderKeywords(list) {
  // 기존 리스트 초기화
  autoCompleteArea.innerHTML = "";

  list.forEach((keyword) => {
    const li = document.createElement("li");
    li.textContent = keyword;
    autoCompleteArea.appendChild(li);
  });
}
