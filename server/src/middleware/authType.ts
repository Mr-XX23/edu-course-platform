import { Request } from 'express';

export interface IExtendedRequest extends Request {
    user?: {
      id: string;
    }
    instituteID?: string | number | null;
}
