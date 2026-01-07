const inputTextarea = document.getElementById("inputTextarea");
const resultTextarea = document.getElementById("resultTextarea");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener('click', async() => {
    const result = await sendMessage(inputTextarea.value);
    resultTextarea.value = result;
})

const sendMessage = async (message) => {
    try {
        const response = await fetch('/chat',
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: message
                })
            }
        );
        
        const data = await response.json();
        return data.description; // TODO : 추후 확인 필요
    } catch(error) {
        console.error('채팅 오류:', error);
        return null;
    }
} 




