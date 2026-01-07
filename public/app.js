const inputTextarea = document.getElementById("input-textarea");
const sendButton = document.getElementById("send-btn");

let keywords = [];

(window.onload = async () => {
  console.log("HI");
  // addUserMessage(inputTextarea.value, "user");
  const result = await sendMessage("HI");
  addBotMessage(result, "bot");
  inputTextarea.value = "";
  result.keywords.forEach((element) => {
    //     console.log(element);
    keywords.push(element);
  });

  keywordEvent();
}),
  { once: true };

sendButton.addEventListener("click", async () => {
  addUserMessage(inputTextarea.value, "user");
  const result = await sendMessage(inputTextarea.value);
  console.log(result);
  addBotMessage(result);
  inputTextarea.value = "";

  keywordEvent();
});

inputTextarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
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

function addUserMessage(text) {
  const message = document.createElement("div");
  message.className = "message user";

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.classList.add("glass-card");
  bubble.textContent = text;

  message.appendChild(bubble);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(result) {
  const message = document.createElement("div");
  message.className = "message bot";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.classList.add("glass-card");
  bubble.textContent = result.content;

  const keywords = document.createElement("div");
  keywords.className = "keywords";

  result.keywords.forEach((word) => {
    const span = document.createElement("span");
    span.className = "keyword";
    span.textContent = word;
    keywords.appendChild(span);
  });

  message.appendChild(bubble);
  message.appendChild(keywords);

  chatMessages.appendChild(message);
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

    liEvent();
  }, 1000);
});

// 화면에 리스트를 그려주는 함수
function renderKeywords(list) {
  // 기존 리스트 초기화
  autoCompleteArea.innerHTML = "";

  list.forEach((keyword) => {
    const li = document.createElement("li");
    li.classList.add("auto-keyword");
    li.textContent = keyword;
    autoCompleteArea.appendChild(li);
  });
}

function keywordEvent() {
  const keywordSpan = document.querySelectorAll(".keyword");
  keywordSpan.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      inputTextarea.value = event.target.innerHTML;
    });
  });
}

function liEvent() {
  const lis = document.querySelectorAll("li");
  lis.forEach((li) => {
    li.addEventListener("click", (event) => {
      inputTextarea.value = event.target.innerHTML;
    });
  });
}
