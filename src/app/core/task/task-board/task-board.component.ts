import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/model/task';
import { TaskStatus } from 'src/app/model/task-status.enum';
import { Project } from 'src/app/model/project';
import { Sprint } from 'src/app/model/sprint';
import { TaskService } from 'src/app/services/task.service';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  @Input() project$: Observable<Project>;
  @Input() sprint$: Observable<Sprint>;
  @Input() tasks$: Observable<Task[]>;
  task_subscr: Subscription

  tasks: Map<String, Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = new Map();

    this.task_subscr = this.tasks$.subscribe(all => {
      this.tasks.set(TaskStatus.Planned, []);
      this.tasks.set(TaskStatus.InProgress, []);
      this.tasks.set(TaskStatus.Done, []);
      for (let el of all) {
        this.tasks.get(el.status).push(el);
      }
    })
  }

  ngOnDestroy() {
    this.task_subscr.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>, project: Project, status: string) {
    let task = event.item.data;
    task.status = status;
    if (status == TaskStatus.Done) {
      task.completedOn = firestore.Timestamp.now();
    } else {
      task.completedOn = null;
    }
    this.taskService.updateTask(project, task)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
