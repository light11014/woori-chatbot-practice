## 필수 요구사항

-   챗봇 API 서버 연동
-   화면 구현
-   Node.js
-   웹뷰

-   프론트
-   백엔드
    -   프론트 POST 받고 -> JSON 가공 -> (네이버 REQUEST -> RESPONSE) -> 프론트 응답

## 추가 요구사항

## API 명세

-   POST "/chat"
    -   body {"description": text}
    -   ```
        response {
            "title": 제목,
            "content" 내용,
            "keywords": ["예금", "적금", "뭐"]
                }
        ```
