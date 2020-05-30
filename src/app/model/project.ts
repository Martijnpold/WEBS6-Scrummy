export class Project {
    id: string;
    name: string;
    description: string;
    members: [string];
    ref: string;

    static fromDoc(id: string, data: any): Project {
        const obj = new Project();
        Object.assign(obj, { id, ...data });
        return obj;
    }
}
