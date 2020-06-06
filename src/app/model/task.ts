export class Task {
    id: string;
    name: string;
    description: string;
    project: string;

    static fromDoc(id: string, data: any): Task {
        const obj = new Task();
        Object.assign(obj, { id, ...data });
        return obj;
    }
}
