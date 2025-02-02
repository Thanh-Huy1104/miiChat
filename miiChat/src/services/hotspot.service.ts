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
export interface createHotspotDTO {
    name: string;
    coordinates: Array<number>;
    description: string;
    address: string;
    tags: Array<string>;
    numVotes: number;
    backgroundImg: string;
    isActive: boolean;
    createdAt?: Date;
    expiryDate?: Date;
  }

export const getActiveHotspots = async (): Promise<IHotspot[]> => {
  try {
    const response = await fetch(`${url}/api/hotspots/getActiveHotspots`, {
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

export const createHotspot = async (createHotspotDTO : createHotspotDTO) => {
    try {
        const response = await fetch(`${url}/api/hotspots/createHotspot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createHotspotDTO),
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
