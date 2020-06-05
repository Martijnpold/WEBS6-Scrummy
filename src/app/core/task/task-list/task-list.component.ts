import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/model/project';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/model/task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() tasks$: Observable<Task[]>;
  subscription: Subscription;

  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = [
    { name: 'ID', id: 'id' },
    { name: 'Name', id: 'name' },
  ];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Project>();
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
    dp.push('controls');
    return dp;
  }
}