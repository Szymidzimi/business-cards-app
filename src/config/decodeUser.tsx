import jwtDecode from "jwt-decode";

export const getUserData = (): TokenUserData | null => {
    const token = localStorage.getItem("token")?.replace("Bearer ", "");
    if (token) {
      const user: TokenUserData = jwtDecode(token);
      return user
    //   return { id: user.id, username: user.userName};
    }
    return null;
  };
  export interface TokenUserData {
    id: string;
    userName: string;
  }