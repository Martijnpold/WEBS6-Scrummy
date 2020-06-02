import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/firestore';
import { ScrummyUser } from '../model/scrummy-user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrummyUserService {

  constructor(private firestore: AngularFirestore) { }

  getScrummyUser(id: string): Observable<ScrummyUser> {
    return this.firestore.collection('users').doc(id)
      .valueChanges()
      .pipe(map((suser: any) => {
        console.log(suser);
        return ScrummyUser.fromDoc(id, suser);
      }));
  }
}
