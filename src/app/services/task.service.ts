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

  get(id: string): Observable<Task> {
    return this.firestore.collection('tasks').doc(id)
      .valueChanges()
      .pipe(map((suser: any) => {
        return Task.fromDoc(id, suser);
      }));
  }

  public getTasks$(project$: Observable<Project>): Observable<Task[]> {
    return project$.pipe(flatMap(project => {
      if (project && project.tasks) {
        return combineLatest(project.tasks.map(member => {
          return this.get(member);
        }));
      } else {
        return [];
      }
    }))
  }

  public update(task: Task): Promise<void> {
    const { id, ...obj } = task;
    return this.firestore.collection('tasks').doc(id).update(obj);
  }

  public create(task: Task): Promise<any> {
    const { id, ...obj } = task;
    return this.firestore.collection('tasks').add(obj);
  }

  public delete(task: Task): Promise<void> {
    return this.firestore.collection('tasks').doc(task.id).delete();
  }
}
