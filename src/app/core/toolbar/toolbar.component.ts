import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ScrummyUserService } from 'src/app/services/scrummy-user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user$: Observable<ScrummyUserService>;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }
}
