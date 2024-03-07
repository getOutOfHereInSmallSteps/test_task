import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PASSWORD_COMPLEXITY } from './shared/enums';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly MIN_PASSWORD_LENGTH = 8;
  readonly PASSWORD_EMPTY = PASSWORD_COMPLEXITY.EMPTY;
  readonly PASSWORD_TOO_SHORT = PASSWORD_COMPLEXITY.TOO_SHORT;
  readonly PASSWORD_WEAK = PASSWORD_COMPLEXITY.WEAK;
  readonly PASSWORD_MEDIUM = PASSWORD_COMPLEXITY.MEDIUM;
  readonly PASSWORDS_STRONG = PASSWORD_COMPLEXITY.STRONG;

  password: string = '';
  passwordStrength: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkStrength(): void {
    if (!this.password) {
      this.passwordStrength = PASSWORD_COMPLEXITY.EMPTY;
    } else if (this.password.length < this.MIN_PASSWORD_LENGTH) {
      this.passwordStrength = PASSWORD_COMPLEXITY.TOO_SHORT;
    } else if (
      /[a-zA-Z]/.test(this.password) &&
      /\d/.test(this.password) &&
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.password)
    ) {
      this.passwordStrength = PASSWORD_COMPLEXITY.STRONG;
    } else if (
      (/[a-zA-Z]/.test(this.password) && /\d/.test(this.password)) ||
      (/\d/.test(this.password) &&
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.password)) ||
      (/[a-zA-Z]/.test(this.password) &&
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.password))
    ) {
      this.passwordStrength = PASSWORD_COMPLEXITY.MEDIUM;
    } else {
      this.passwordStrength = PASSWORD_COMPLEXITY.WEAK;
    }
  }
}
