import { Status } from "@/lib/types/type";


export interface IRegristerData {
    username: string;
    email: string;
    password: string;
}

export interface ILoginFormData {
    email: string;
    password: string;
}

export interface IInitalState {
    user : ILoginFormData;
    status: Status;
}