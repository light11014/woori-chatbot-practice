const sendMessage = async (message) => {
    console.log('실행');
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
        
        console.log(data);

        return data.description; // TODO : 추후 확인 필요
    } catch(error) {
        console.error('채팅 오류:', error);
        return null;
    }
} 


sendMessage('hi');
