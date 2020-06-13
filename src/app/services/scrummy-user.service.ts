import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ScrummyUser } from '../model/scrummy-user';
import { map, flatMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ScrummyUserService {

  constructor(private firestore: AngularFirestore) { }

  get(id: string): Observable<ScrummyUser> {
    return this.firestore.collection('users').doc(id)
      .valueChanges()
      .pipe(map((suser: any) => {
        return ScrummyUser.fromDoc(id, suser);
      }));
  }

  getAll(): Observable<ScrummyUser[]> {
    return this.firestore.collection('users')
      .snapshotChanges()
      .pipe(map((users: any[]) => {
        return users
          .map(user => {
            const doc = user.payload.doc;
            const obj = ScrummyUser.fromDoc(doc.id, doc.data());
            return obj;
          })
      }));
  }

  getMembers$(project$: Observable<Project>): Observable<ScrummyUser[]> {
    return project$.pipe(flatMap(project => {
      return combineLatest(project.members.map(member => {
        return this.get(member);
      }));
    }))
  }
}
