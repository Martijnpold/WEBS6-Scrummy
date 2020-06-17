import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrummyUser } from 'src/app/model/scrummy-user';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';
import { first } from 'rxjs/operators';
import { Project } from 'src/app/model/project';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  @Input() project$: Observable<Project>;
  @Input() members$: Observable<ScrummyUser[]>;
  allMembers$: Observable<ScrummyUser[]>;
  invitee: String;

  constructor(private projectService: ProjectService, private suserService: ScrummyUserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allMembers$ = this.suserService.getAll();
  }

  invite(project: Project, all: ScrummyUser[]) {
    let found = false;
    all.forEach(el => {
      if (el.displayName == this.invitee) {
        if (!project.members.includes(el.id)) {
          project.members.push(el.id);
          this.projectService.update(project);
          this.toastr.success(`Added ${el.displayName} to the project!`);
          found = true;
        }
      }
    });
    if (!found) {
      this.toastr.error(`Could not add the user '${this.invitee}'`)
    }
  }
}
