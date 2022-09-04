import * as React from "react";

type User = { id: number; isLoggedIn: boolean; username: string;}

type LoginContextUser = { user: User | null, setUser: React.Dispatch<React.SetStateAction<User>> | any };

export const LoginContext = React.createContext<LoginContextUser>({ user: null, setUser: () => { } });