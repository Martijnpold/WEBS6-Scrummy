import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../../model/project';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>;
  subscription: Subscription;

  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = [
    { name: 'ID', id: 'id' },
    { name: 'Name', id: 'name' },
  ];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Project>();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.projects$ = this.projectService.getAll();
    this.subscription = this.projects$.subscribe(a => {
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
