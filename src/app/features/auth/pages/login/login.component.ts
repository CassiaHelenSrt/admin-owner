import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  protected loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.login(email, password);
    }
  }

  private login(email: string, password: string) {
    this.loading = true;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro no login', err);
        // errorMessage = 'Email ou senha inválidos';
      },
    });
  }
}
