const inputTextarea2 = document.getElementById("input-textarea");
const autoCompleteArea = document.querySelector(".auto-complete-container");

let timerId;
inputTextarea2.addEventListener("input", (event) => {
    clearTimeout(timerId);
    console.log(1);
    timerId = setTimeout(() => {
        // 입력값 가져오기
        const text = event.target.value;
        window.localStorage.setItem(
            "keywords",
            JSON.stringify(["예금", "예금 필수문서", "적금"])
        );
        // 2. localStorage에서 키워드 가져오기
        const keywords = window.localStorage.getItem("keywords");
        const parsedKeywords = JSON.parse(keywords);

        const filteredList = parsedKeywords.filter((value) =>
            value.startsWith(text)
        );

        console.log(filteredList);
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
