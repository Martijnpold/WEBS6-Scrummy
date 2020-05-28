export class Project {
    id: string;
    name: string;
    description: string;
    members: [string];

    static fromDoc(id: string, data: any): Project {
        const obj = new Project();
        obj.id = id;
        Object.assign(obj, data);
        return obj;
    }
}
