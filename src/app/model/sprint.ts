import { firestore } from 'firebase';

export class Sprint {
    id: string;
    name: string;
    startDate: firestore.Timestamp;
    endDate: firestore.Timestamp;
    active: boolean;

    constructor() {
    }

    static fromDoc(id: string, data: any): Sprint {
        const obj = new Sprint();
        Object.assign(obj, { id, ...data });
        return obj;
    }
}
