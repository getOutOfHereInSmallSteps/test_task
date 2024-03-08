import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PasswordStrengthCheckerComponent } from './shared/components/password-strength-checker/password-strength-checker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, PasswordStrengthCheckerComponent],
})
export class AppComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
