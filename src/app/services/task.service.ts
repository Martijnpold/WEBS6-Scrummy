import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';
import { Project } from '../model/project';
import { Task } from '../model/task';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sprint } from '../model/sprint';
import { TaskStatus } from '../model/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) { }

  getTasks$(project$: Observable<Project>, for_sprint: Sprint = null, archived: boolean = false): Observable<Task[]> {
    return project$.pipe(flatMap(project => {
      return this.firestore.collection('projects').doc(project.id).collection('tasks')
        .snapshotChanges()
        .pipe(map(arr => {
          return arr.map(data => {
            const doc = data.payload.doc;
            const obj = Task.fromDoc(doc.id, doc.data());
            return obj;
          })
            .filter(x => x != null)
            .filter(x => x.archived == archived)
            .filter(x => (!for_sprint && (!x.sprint || x.status != TaskStatus.Done)) || (for_sprint && for_sprint.id == x.sprint));
        }))
        .pipe(tap(x => x.sort((a, b) => {
          return b.createdOn.seconds - a.createdOn.seconds;
        })));
    }));
  }

  updateTask(project: Project, task: Task): Promise<void> {
    const { id, ...obj } = task;
    return this.firestore.collection('projects').doc(project.id).collection('tasks').doc(task.id).update(obj);
  }

  createTask(project: Project, task: Task): Promise<any> {
    const { id, ...obj } = task;
    return this.firestore.collection('projects').doc(project.id).collection('tasks').add(obj);
  }
}
