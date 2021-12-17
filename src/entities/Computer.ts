export interface IComputer {
    id: number;
    name: string;
    description: string;
}

class Computer implements IComputer {

    public id: number;
    public name: string;
    public description: string;

    constructor(name: string | IComputer, description?: string, id?: number) {
        if (typeof name === 'string') {
            this.name = name;
            this.description = description || '';
            this.id = id || -1;
        } else {
            this.name = name.name;
            this.description = name.description;
            this.id = name.id;
        }
    }
}

export default Computer;
