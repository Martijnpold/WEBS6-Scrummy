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

  getTasks$(project$: Observable<Project>): Observable<Task[]> {
    return project$.pipe(flatMap(project => {
      return this.firestore.collection('projects').doc(project.id).collection('tasks')
        .snapshotChanges()
        .pipe(map(arr => {
          return arr.map(data => {
            const doc = data.payload.doc;
            const obj = Task.fromDoc(doc.id, doc.data());
            return obj;
          })
        }))
    }));
  }

  update(project: Project, task: Task): Promise<void> {
    const { id, ...obj } = task;
    return this.firestore.collection('projects').doc(project.id).collection('tasks').doc(task.id).update(obj);
  }

  create(project: Project, task: Task): Promise<any> {
    const { id, ...obj } = task;
    return this.firestore.collection('projects').doc(project.id).collection('tasks').add(obj);
  }

  delete(project: Project, task: Task): Promise<void> {
    return this.firestore.collection('projects').doc(project.id).collection('tasks').doc(task.id).delete();
  }
}
