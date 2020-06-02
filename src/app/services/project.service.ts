import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, zip, combineLatest } from 'rxjs';
import { map, flatMap, zipAll } from 'rxjs/operators';
import { Project } from '../model/project';
import { AuthService } from './auth.service';
import { ScrummyUserService } from './scrummy-user.service';
import { ScrummyUser } from '../model/scrummy-user';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private firestore: AngularFirestore, private susers: ScrummyUserService, private auth: AuthService) {
  }

  public getAll(): Observable<Project[]> {
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
                .filter(x => x != null);
            }));
        }
        return of([]);
      }));
  }

  public get(id: string): Observable<Project> {
    return this.auth.getUser()
      .pipe(flatMap((user) => {
        if (user) {
          return this.firestore.collection('projects').doc(id)
            .valueChanges()
            .pipe(map((project: any) => {
              const obj = Project.fromDoc(id, project);
              return (obj.members.includes(user.id)) ? obj : null;
            }));
        } else {
          return of(null);
        }
      }));
  }

  public getMembers(project: Project): Observable<ScrummyUser[]> {
    console.log('get members for ' + project.name)
    return this.get(project.id).pipe(
      flatMap(project => {
        return combineLatest(project.members.map(member => {
          return this.susers.getScrummyUser(member);
        }));
      }))
  }

  public getMembers$(project$: Observable<Project>): Observable<ScrummyUser[]> {
    return project$.pipe(flatMap(project => {
      return this.getMembers(project);
    }))
  }

  public update(project: Project): Promise<void> {
    const { id, ...obj } = project;
    return this.firestore.collection('projects').doc(id).update(obj);
  }

  public create(project: Project): Promise<any> {
    const { id, ...obj } = project;
    return this.firestore.collection('projects').add(obj);
  }

  public delete(project: Project): Promise<void> {
    return this.firestore.collection('projects').doc(project.id).delete();
  }
}
