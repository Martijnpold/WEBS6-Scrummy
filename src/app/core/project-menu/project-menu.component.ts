import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/model/sprint';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.scss']
})
export class ProjectMenuComponent implements OnInit {
  @Input() opened: boolean
  @Input() headerTitle: string;
  @Input() project$: Observable<Project>;
  sprints$: Observable<Sprint[]>;

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
    this.sprints$ = this.sprintService.getSprints$(this.project$);
  }
}
