import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from 'src/app/model/sprint';
import { SprintService } from 'src/app/services/sprint.service';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-sprint-item',
  templateUrl: './sprint-item.component.html',
  styleUrls: ['./sprint-item.component.scss']
})
export class SprintItemComponent implements OnInit {
  @Input() project: Project;
  @Input() sprint: Sprint;

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
  }

  activate() {
    this.sprintService.setActive(this.project, this.sprint);
  }
}
