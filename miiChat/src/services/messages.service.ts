import { url } from ".";
export interface CreateMessageDTO {
    chatID: string;
    content: string;
    senderID: string;
  }
export const sendMessages = async (createMessageDTO : CreateMessageDTO) => {
  try {
    const response = await fetch(`${url}/api/messages/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createMessageDTO),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch messages");
    }
  } catch (error) {
    console.error(error);
  }
};