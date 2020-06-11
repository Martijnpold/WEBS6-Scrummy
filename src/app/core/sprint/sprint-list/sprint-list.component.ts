import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from 'src/app/model/sprint';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {
  @Input() project$: Observable<Project>;
  @Input() sprints$: Observable<Sprint[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
