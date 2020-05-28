import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { Project } from '../model/project';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects$: Observable<Project[]>;

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    this.projects$ = this.auth.getUser()
      .pipe(flatMap((user) => {
        return this.firestore.collection('projects')
          .snapshotChanges()
          .pipe(map((projects: any[]) => {
            return projects
              .map(project => {
                const doc = project.payload.doc;
                const obj = Project.fromDoc(doc.id, doc.data());
                return (obj.members.includes(user.uid)) ? obj : null;
              })
              .filter(x => x != null);
          }));
      }));
  }

  public getAll(): Observable<Project[]> {
    return this.projects$;
  }

  public get(id: string): Observable<Project> {
    return this.auth.getUser()
      .pipe(flatMap((user) => {
        return this.firestore.collection('projects').doc(id)
          .snapshotChanges()
          .pipe(map((project: any) => {
            const doc = project.payload.doc;
            const obj = Project.fromDoc(doc.id, doc.data());
            return (obj.members.includes(user.uid)) ? obj : null;
          }));
      }));
  }

  public update(project: Project) {
    const { id, ...obj } = project;
    this.firestore.collection('projects').doc(id).update(obj);
  }

  public create(project: Project) {
    const { id, ...obj } = project;
    this.firestore.collection('projects').add(obj);
  }

  public delete(project: Project) {
    this.firestore.collection('projects').doc(project.id).delete();
  }
}
