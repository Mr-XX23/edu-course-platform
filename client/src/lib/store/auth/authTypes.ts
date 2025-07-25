import { Status } from "@/lib/types/type";

export interface IFormData {
    username?: string;
    email: string;
    password: string;
}

export interface ILoginFormData {
    id: string;
    username: string;
    token: string;
}

export interface IRegisterData extends ILoginFormData {
    email?: string;
}

export interface IInitalState {
    user : IRegisterData;
    status: Status;
    session: {
        loggedIn: boolean;
    }
}