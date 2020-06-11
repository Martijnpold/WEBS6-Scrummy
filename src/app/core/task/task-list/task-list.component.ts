import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Task } from 'src/app/model/task';
import { Sprint } from 'src/app/model/sprint';
import { Project } from 'src/app/model/project';
import { TaskService } from 'src/app/services/task.service';
import { TaskStatus } from 'src/app/model/task-status.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() project$: Observable<Project>;
  @Input() tasks$: Observable<Task[]>;
  @Input() active_sprint$: Observable<Sprint>;
  subscription: Subscription;

  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = [
    { id: 'index' },
    { name: 'Name', id: 'name' },
    { name: 'Story Points', id: 'story_points' },
    { name: 'Status', id: 'status' },
    { id: 'controls' },
  ];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Task>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.tasks$.subscribe(a => {
      this.dataSource.data = a
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getColumnNames() {
    var dp = this.displayedColumns.map(a => {
      return a.id
    });
    return dp;
  }

  details(task: Task) {
    console.log('details ' + Math.random())
    console.log(task);
  }

  plan(project: Project, sprint: Sprint, task: Task) {
    task.sprint = sprint.id;
    task.status = TaskStatus.Planned;
    this.taskService.updateTask(project, task);
  }

  archive(project: Project, task: Task) {
    task.archived = true;
    this.taskService.updateTask(project, task);
  }
}