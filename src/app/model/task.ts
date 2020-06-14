import { TaskStatus } from './task-status.enum';
import { firestore } from 'firebase';

export class Task {
    id: string;
    name: string;
    description: string;
    story_points: number;
    creator: string;
    sprint: string;
    status: TaskStatus;
    archived: boolean;
    createdOn: firestore.Timestamp;
    completedOn: firestore.Timestamp;

    constructor() {
        this.story_points = 1;
        this.archived = false;
        this.status = TaskStatus.Todo;
        this.createdOn = firestore.Timestamp.now();
    }

    static fromDoc(id: string, data: any): Task {
        const obj = new Task();
        Object.assign(obj, { id, ...data });
        return obj;
    }

    isCompleted() {
        return status == TaskStatus.Done;
    }

    wasCompletedOn(date: Date) {
        return this.isCompleted() && this.completedOn && this.completedOn.toDate() < date;
    }
}
