import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects$: Observable<any>;

  constructor(private firestore: AngularFirestore) {
    this.projects$ = this.firestore.collection('projects').valueChanges();
  }

  public getAll(): Observable<any> {
    return this.projects$;
  }
}
