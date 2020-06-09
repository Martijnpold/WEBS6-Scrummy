import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { Project } from 'src/app/model/project';
import { Task } from 'src/app/model/task';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-members-page',
  templateUrl: './project-members-page.component.html',
  styleUrls: ['./project-members-page.component.scss']
})
export class ProjectMembersPageComponent implements OnInit {
  user$: Observable<ScrummyUser>;
  project$: Observable<Project>;
  tasks$: Observable<Task[]>;
  showFiller = false;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
    this.project$ = this.projectService.get(this.route.snapshot.paramMap.get('pid'));
  }
}
