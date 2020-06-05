import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { ScrummyUser } from '../model/scrummy-user';
import { map, flatMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ScrummyUserService {

  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase) { }

  get(id: string): Observable<ScrummyUser> {
    return this.firestore.collection('users').doc(id)
      .valueChanges()
      .pipe(map((suser: any) => {
        return ScrummyUser.fromDoc(id, suser);
      }));
  }

  public getMembers$(project$: Observable<Project>): Observable<ScrummyUser[]> {
    return project$.pipe(flatMap(project => {
      return combineLatest(project.members.map(member => {
        return this.get(member);
      }));
    }))
  }
}
