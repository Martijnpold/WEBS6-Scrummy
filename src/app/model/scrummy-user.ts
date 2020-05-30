export class ScrummyUser {
    id: string;
    displayName: string;

    static fromDoc(id: string, data: any): ScrummyUser {
        const obj = new ScrummyUser();
        Object.assign(obj, { id, ...data });
        return obj;
    }
}
