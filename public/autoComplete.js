const inputTextarea2 = document.getElementById("inputTextarea");
const [autoComplete1, autoComplete2, autoComplete3] =
    document.querySelector(".auto-complete");

let timerId;
inputTextarea2.addEventListener("input", (event) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
        // 입력값 가져오기
        const text = event.target.value;
        window.localStorage.setItem(
            "keywords",
            JSON.stringify(["예금", "예금 필수문서", "적금"])
        );
        // 2. localStorage에서 키워드 가져오기
        const keywords = window.localStorage.getItem("keywords");
        const parsedKeywords = JSON.parse(keywordsRaw);

        const filteredList = parsedKeywords.filter((value) =>
            value.startsWith(text)
        );

        // 3. 렌더링
        autoComplete1.innerHTML = filteredList[0];
        autoComplete2.innerHTML = filteredList[1];
        autoComplete3.innerHTML = filteredList[2];
    }, 1000);
});
