import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, flatMap, filter } from 'rxjs/operators';
import { Project } from '../model/project';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
  }

  getAll(archived: boolean = false): Observable<Project[]> {
    return this.auth.getUser()
      .pipe(flatMap((user) => {
        if (user) {
          return this.firestore.collection('projects')
            .snapshotChanges()
            .pipe(map((projects: any[]) => {
              return projects
                .map(project => {
                  const doc = project.payload.doc;
                  const obj = Project.fromDoc(doc.id, doc.data());
                  return (obj.members.includes(user.id)) ? obj : null;
                })
                .filter(x => x != null)
                .filter(x => x.archived == archived);
            }));
        }
        return of([]);
      }));
  }

  get(id: string, archived: boolean = false): Observable<Project> {
    return this.auth.getUser()
      .pipe(flatMap((user) => {
        if (user) {
          return this.firestore.collection('projects').doc(id)
            .valueChanges()
            .pipe(map((project: any) => {
              const obj = Project.fromDoc(id, project);
              return (obj.members.includes(user.id)) ? obj : null;
            }))
            .pipe(filter(x => x != null))
            .pipe(filter(x => x.archived == archived));
        } else {
          return of(null);
        }
      }));
  }

  update(project: Project): Promise<void> {
    const { id, ...obj } = project;
    return this.firestore.collection('projects').doc(id).update(obj);
  }

  create(project: Project): Promise<any> {
    const { id, ...obj } = project;
    return this.firestore.collection('projects').add(obj);
  }

  delete(project: Project): Promise<void> {
    return this.firestore.collection('projects').doc(project.id).delete();
  }
}
