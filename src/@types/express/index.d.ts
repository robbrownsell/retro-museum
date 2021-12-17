import { IComputer } from "@entities/Computer";

declare module 'express' {
    export interface Request  {
        body: {
            computer: IComputer
        };
    }
}
