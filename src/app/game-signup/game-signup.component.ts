import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './game-signup.component.html',
  styleUrl: './game-signup.component.scss'
})
export class GameSignupComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  countries: string[] = ['United States', 'United Kingdom', 'Czech Republic', 'India', 'Canada'];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      displayName: ['', Validators.required],
      password: ['', Validators.required],
      subscribe: [false],
      terms: [false, Validators.requiredTrue]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
    }
  }
}
