import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { Sprint } from '../model/sprint';
import { flatMap, map, tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private firestore: AngularFirestore) { }

  getActiveSprint$(project$: Observable<Project>): Observable<Sprint> {
    return this.getSprints$(project$).pipe(map(arr => {
      for (let spr of arr) {
        if (spr.active) return spr;
      }
      return null;
    }));
  }

  get$(project$: Observable<Project>, id: string): Observable<Sprint> {
    return project$.pipe(flatMap((project) => {
      return this.firestore.collection('projects').doc(project.id).collection('sprints').doc(id)
        .valueChanges()
        .pipe(map((project: any) => {
          const obj = Sprint.fromDoc(id, project);
          return obj;
        }))
    }));
  }

  getSprints$(project$: Observable<Project>): Observable<Sprint[]> {
    return project$.pipe(flatMap(project => {
      return this.firestore.collection('projects').doc(project.id).collection('sprints')
        .snapshotChanges()
        .pipe(map(arr => arr.map(data => {
          const doc = data.payload.doc;
          const obj = Sprint.fromDoc(doc.id, doc.data());
          return obj;
        })))
        .pipe(tap(x => x.sort((a, b) => {
          return b.startDate.seconds - a.startDate.seconds;
        })));
    }));
  }

  setActive(project: Project, toActivate: Sprint) {
    this.firestore.collection('projects').doc(project.id).collection('sprints').get().pipe(first()).subscribe(all => {
      all.forEach(doc => {
        let sprint = Sprint.fromDoc(doc.id, doc.data());
        if (sprint.active) {
          sprint.active = false;
          this.update(project, sprint);
        }
      });
      toActivate.active = true;
      this.update(project, toActivate);
    })
    toActivate.active = true;
    this.update(project, toActivate);
  }

  update(project: Project, sprint: Sprint): Promise<void> {
    const { id, ...obj } = sprint;
    return this.firestore.collection('projects').doc(project.id).collection('sprints').doc(sprint.id).update(obj);
  }

  create(project: Project, sprint: Sprint): Promise<any> {
    const { id, ...obj } = sprint;
    return this.firestore.collection('projects').doc(project.id).collection('sprints').add(obj);
  }

  delete(project: Project, sprint: Sprint): Promise<void> {
    return this.firestore.collection('projects').doc(project.id).collection('sprints').doc(sprint.id).delete();
  }
}
