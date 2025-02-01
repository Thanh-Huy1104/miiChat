import {url} from "./index.ts";

export interface createHotspotDTO {
    name: string;
    coordinates: Array<number>;
    description: string;
    address: string;
    tags: Array<string>;
    numVotes: number;
}

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