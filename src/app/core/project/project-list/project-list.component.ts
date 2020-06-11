import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../model/project';
import { AuthService } from 'src/app/services/auth.service';
import { ScrummyUser } from 'src/app/model/scrummy-user';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @Input() projects$: Observable<Project[]>;
  user$: Observable<ScrummyUser>;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user$ = this.auth.getUser();
  }
}
