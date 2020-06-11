import { TaskStatus } from './task-status.enum';
import { firestore } from 'firebase';

export class Task {
    id: string;
    name: string;
    description: string;
    creator: string;
    sprint: string;
    status: TaskStatus;
    archived: boolean;
    createdOn: firestore.Timestamp;


    constructor() {
        this.archived = false;
        this.status = TaskStatus.Todo;
        this.createdOn = firestore.Timestamp.now();
    }

    static fromDoc(id: string, data: any): Task {
        const obj = new Task();
        Object.assign(obj, { id, ...data });
        return obj;
    }
}
