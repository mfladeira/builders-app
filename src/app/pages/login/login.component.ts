import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  formError = false;
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn() ? this.router.navigateByUrl('/weather') : this.router.navigateByUrl('/')
  }

  login() {
    if (this.emailFormControl.value && this.passwordFormControl.value) {
      const authResponse = this.auth.login(this.emailFormControl.value, this.passwordFormControl.value);
      if (authResponse) {
        this.router.navigateByUrl('/weather')
        localStorage.setItem('token', Math.random().toString(36));
      }
    } else {
      this.formError = true;
      return;
    }
  }
}
