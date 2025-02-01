import { url } from ".";

export const getMessages = async (currentHotspot : string) => {
  try {
    const response = await fetch(`${url}/api/chats/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentHotspot),
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