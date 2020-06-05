import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ScrummyUser } from '../model/scrummy-user';
import { map, flatMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ScrummyUserService } from './scrummy-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firestore: AngularFirestore, private susers: ScrummyUserService, private auth: AngularFireAuth) {
  }

  getFireUser() {
    return this.auth.user;
  }

  getUser() {
    return this.auth.user
      .pipe(flatMap(user => {
        if (user) {
          return this.susers.getScrummyUser(user.uid);
        }
        return of(null);
      }));
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  register(displayName: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(user => {
        const scrummy_user = new ScrummyUser();
        scrummy_user.displayName = displayName;
        this.firestore.collection('users').doc(user.user.uid).set({ ...scrummy_user });
        resolve(scrummy_user);
      }).catch(reason => {
        reject(reason);
      })
    })
  }
}
