import { Status } from "@/lib/types/type";

export interface IInstitute {
    instituteName: string;
    instituteEmail: string;
    institutePhoneNumber: string;
    instituteAddress: string;
    institutePanNo ?: string;
    instituteVatNo ?: string;
}

export interface IInstituteInitialState {
    institute : IInstitute;
    status: Status;
}
