import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.getFireUser();
  }

  logout() {
    this.auth.logout();
  }
}
