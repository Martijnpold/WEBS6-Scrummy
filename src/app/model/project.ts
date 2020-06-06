export class Project {
    id: string;
    name: string;
    description: string;
    members: string[];
    tasks: string[];
    ref: string;

    constructor() {
        this.tasks = [];
        this.members = [];
    }

    static fromDoc(id: string, data: any): Project {
        const obj = new Project();
        Object.assign(obj, { id, ...data });
        return obj;
    }
}
