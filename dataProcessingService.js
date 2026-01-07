export async function requestToSend(description) {
    const data = {
        type: "text",
        data: {
            description,
        },
    };

    return data;
}
