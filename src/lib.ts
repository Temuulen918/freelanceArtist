import { SessionOptions } from "iron-session";

export interface SessionData{
    username: string;
    password: string;
    type: string;  
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
    password: "TEMUULENMUNKHTULGA20010918ULAANBAATAR",
    cookieName: "buteelchSession",
    cookieOptions: {
    httpsOnly: true,
    secure: false,
    }
}