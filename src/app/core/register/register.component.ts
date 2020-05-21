import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    const email = this.registerForm.get('email');
    if (email.hasError('required')) return 'You must enter a value';
    if (email.hasError('email')) return 'Not a valid email';
    return '';
  }

  getPasswordErrorMessage() {
    const password = this.registerForm.get('password');
    if (password.hasError('required')) return 'You must enter a value';
    if (password.hasError('minlength')) return 'Password should be at least 6 characters long';
    return '';
  }

  submitEnter($event: KeyboardEvent) {
    $event.stopPropagation();
  }

  register() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.get('email').value, this.registerForm.get('password').value).then(c => {
        this.toastr.success('You have been registered!');
        this.router.navigate(['/']);
      }).catch(r => {
        this.toastr.error('Invalid credentials!');
      })
    }
  }
}
