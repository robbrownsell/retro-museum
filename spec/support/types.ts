import { Response } from 'supertest';
import { IComputer } from '@entities/Computer';


export interface IResponse extends Response {
    body: {
        computers: IComputer[];
        error: string;
    };
}

export interface IReqBody {
    computer?: IComputer;
}
