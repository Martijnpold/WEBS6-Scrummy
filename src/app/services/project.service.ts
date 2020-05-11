import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../project/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects$: Observable<Project[]>;

  constructor(private firestore: AngularFirestore) {
    this.projects$ = this.firestore.collection('projects')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(project => {
          const doc = project.payload.doc;
          return Project.fromDoc(doc.id, doc.data());
        });
      }));
  }

  public getAll(): Observable<Project[]> {
    return this.projects$;
  }

  public update(project: Project) {
    this.firestore.collection('projects').doc(project.id).update(project);
  }

  public create(project: Project) {
    this.firestore.collection('projects').add(project);
  }
}
