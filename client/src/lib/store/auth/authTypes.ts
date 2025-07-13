import { Status } from "@/lib/types/type";

export interface ILoginFormData {
    email?: string;
    password?: string;
}

export interface IRegisterData extends ILoginFormData {
    username?: string;
}

export interface IInitalState {
    user : IRegisterData;
    status: Status;
}