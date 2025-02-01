import { url } from ".";

export interface IHotspot {
    hotSpotID: string;
    chatID: string;
    name: string;
    coordinates: Array<number>;
    description: string;
    address: string;
    tags: Array<string>;
    numVotes: number;
    backgroundImg: string;
    isActive: boolean;
    createdAt: Date;
    expiryDate: Date;
  }

export const getActiveHotspots = async (): Promise<IHotspot[]> => {
  try {
    const response = await fetch(`${url}/hotspots/getActiveHotspots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch active hotspots");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching active hotspots:", error);
    return [];
  }
};
