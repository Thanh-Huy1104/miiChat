import { url } from ".";

export const getMessages = async (chatID: string, lastMessageID?: string) => {
  try {
    const response = await fetch(`${url}/api/chats/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatID, lastMessageID }), // ✅ Correct key
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};