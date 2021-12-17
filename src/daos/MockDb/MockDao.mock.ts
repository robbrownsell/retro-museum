import jsonfile from 'jsonfile';
import { IComputer } from '@entities/Computer';


interface IDatabase {
    computers: IComputer[];
}


class MockDaoMock {

    private readonly dbFilePath = 'src/daos/MockDb/MockComputerDb.json';


    protected openDb(): Promise<IDatabase> {
        return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
    }


    protected saveDb(db: IDatabase): Promise<void> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}

export default MockDaoMock;
