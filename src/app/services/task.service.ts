import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Project } from '../model/project';
import { Task } from '../model/task';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) { }

  public getTasks$(project$: Observable<Project>): Observable<Task[]> {
    return project$.pipe(flatMap(project => {
      return combineLatest(this.firestore.collection('projects').doc(project.id).collection('tasks')
        .snapshotChanges()
        .pipe(flatMap(arr => {
          return arr.map(data => {
            const doc = data.payload.doc;
            const obj = Task.fromDoc(doc.id, doc.data());
            return obj;
          })
        })))
    }));
  }

  public update(project: Project, task: Task): Promise<void> {
    const { id, ...obj } = task;
    return this.firestore.collection('projects').doc(project.id).collection('tasks').doc(task.id).update(obj);
  }

  public create(project: Project, task: Task): Promise<any> {
    const { id, ...obj } = task;
    return this.firestore.collection('projects').doc(project.id).collection('tasks').add(obj);
  }

  public delete(project: Project, task: Task): Promise<void> {
    return this.firestore.collection('projects').doc(project.id).collection('tasks').doc(task.id).delete();
  }
}
