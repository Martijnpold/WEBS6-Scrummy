export class Sprint {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;

    constructor() {
    }

    static fromDoc(id: string, data: any): Sprint {
        const obj = new Sprint();
        Object.assign(obj, { id, ...data });
        return obj;
    }
}
