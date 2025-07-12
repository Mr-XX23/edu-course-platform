import { Status } from "@/lib/types/type";

export interface IInstitute {
    instituteEmail: string;
    instituteName: string;
    instituteAddress: string;
    institutePhoneNumber: string;
}

export interface IInstituteInitialState {
    institute : IInstitute;
    status: Status;
}
