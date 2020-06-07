import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.scss']
})
export class ProjectMenuComponent implements OnInit {
  @Input() opened: boolean
  @Input() headerTitle: string;
  @Input() project$: Observable<Project>;

  constructor() { }

  ngOnInit(): void {
  }
}
