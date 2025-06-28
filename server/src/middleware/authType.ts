import { Request } from 'express';

export interface IExtendedRequest extends Request {
    user?: {
      id: string;
      currentInstituteID?: string | number | null;
    }
    instituteID?: string | number | null;
}
