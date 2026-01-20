import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    // redirect to home if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.authService.getRedirectUrl()]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // If a specific returnUrl was requested (e.g. they tried to access a protected page), go there.
          // Otherwise, go to their role-specific dashboard.
          if (
            this.returnUrl &&
            this.returnUrl !== '/' &&
            this.returnUrl !== '/login'
          ) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate([this.authService.getRedirectUrl()]);
          }
        },
        error: (error: any) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
}
