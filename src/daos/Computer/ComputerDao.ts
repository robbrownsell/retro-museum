import { IComputer } from '@entities/Computer';



export interface IComputerDao {
    getOne: (id: number) => Promise<IComputer | null>;
    getAll: () => Promise<IComputer[]>;
    add: (computer: IComputer) => Promise<void>;
    update: (computer: IComputer) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class ComputerDao implements IComputerDao {


    /**
     * @param number
     */
    public getOne(id: number): Promise<IComputer | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<IComputer[]> {
         // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param computer
     */
    public async add(computer: IComputer): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param computer
     */
    public async update(computer: IComputer): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default ComputerDao;
