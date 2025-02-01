import { url } from ".";

export type CreateUserDto = {
  username: string;
  password: string;
  profileImg: number;
};

export interface LoginDTO {
  username: string;
  password: string;
}

export interface IUser {
  userID: string;
  username: string;
  password: string;
  profileImg: number;
  HotspotIDs: string[];
  Votes: string[];
  createdAt: Date;
  createdHotspot: boolean;
}
export const createUser = async (user: CreateUserDto) => {
  try {
    const response = await fetch(`${url}/api/users/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (credentials: LoginDTO) => {
  try {
    const response = await fetch(`${url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error(error);
  }
};
