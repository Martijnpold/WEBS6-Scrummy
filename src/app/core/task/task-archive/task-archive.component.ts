import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-task-archive',
  templateUrl: './task-archive.component.html',
  styleUrls: ['./task-archive.component.scss']
})
export class TaskArchiveComponent implements OnInit {
  project$: Observable<Project>;
  tasks$: Observable<Task[]>;

  constructor(private projectService: ProjectService, private taskService: TaskService, @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    this.project$ = this.projectService.get(this.data.project_id);
    this.tasks$ = this.taskService.getTasks$(this.project$, undefined, true);
  }

  unarchive(project: Project, task: Task) {
    task.archived = false;
    this.taskService.updateTask(project, task);
  }
}
