import { IComputer } from '@entities/Computer';
import { getRandomInt } from '@shared/functions';
import { IComputerDao } from './ComputerDao';
import MockDaoMock from '../MockDb/MockDao.mock';



class ComputerDao extends MockDaoMock implements IComputerDao {


    public async getOne(id: number): Promise<IComputer | null> {
        const db = await super.openDb();
        for (const computer of db.computers) {
            if (computer.id === id) {
                return computer;
            }
        }
        return null;
    }


    public async getAll(): Promise<IComputer[]> {
        const db = await super.openDb();
        return db.computers;
    }


    public async add(computer: IComputer): Promise<void> {
        const db = await super.openDb();
        computer.id = getRandomInt();
        db.computers.push(computer);
        await super.saveDb(db);
    }


    public async update(computer: IComputer): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.computers.length; i++) {
            if (db.computers[i].id === computer.id) {
                db.computers[i] = computer;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Computer not found');
    }


    public async delete(id: number): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.computers.length; i++) {
            if (db.computers[i].id === id) {
                db.computers.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('Computer not found');
    }
}

export default ComputerDao;
