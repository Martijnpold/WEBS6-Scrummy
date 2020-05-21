import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    const email = this.loginForm.get('email');
    if (email.hasError('required')) return 'You must enter a value';
    if (email.hasError('email')) return 'Not a valid email';
    return '';
  }

  getPasswordErrorMessage() {
    const password = this.loginForm.get('password');
    if (password.hasError('required')) return 'You must enter a value';
    if (password.hasError('minlength')) return 'Password should be at least 6 characters long';
    return '';
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value).then(c => {
        this.toastr.success('You have been signed in!');
        this.router.navigate(['/']);
      }).catch(r => {
        this.toastr.error('Invalid credentials!');
      })
    }
  }
}
