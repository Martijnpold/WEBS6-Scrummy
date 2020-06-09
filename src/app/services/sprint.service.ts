import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { Sprint } from '../model/sprint';
import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private firestore: AngularFirestore) { }

  public getSprints$(project$: Observable<Project>): Observable<Sprint[]> {
    return project$.pipe(flatMap(project => {
      return this.firestore.collection('projects').doc(project.id).collection('sprints')
        .snapshotChanges()
        .pipe(map(arr => arr.map(data => {
          const doc = data.payload.doc;
          const obj = Sprint.fromDoc(doc.id, doc.data());
          return obj;
        })));
    }));
  }

  public update(project: Project, sprint: Sprint): Promise<void> {
    const { id, ...obj } = sprint;
    return this.firestore.collection('projects').doc(project.id).collection('sprints').doc(sprint.id).update(obj);
  }

  public create(project: Project, sprint: Sprint): Promise<any> {
    const { id, ...obj } = sprint;
    return this.firestore.collection('projects').doc(project.id).collection('sprints').add(obj);
  }

  public delete(project: Project, sprint: Sprint): Promise<void> {
    return this.firestore.collection('projects').doc(project.id).collection('sprints').doc(sprint.id).delete();
  }
}
