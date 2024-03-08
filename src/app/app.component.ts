import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PASSWORD_COMPLEXITY } from './shared/enums';
import { MediumPasswordPatternPipe } from './shared/pipes/medium-password-pattern.pipe';
import { StrongPasswordPatternPipe } from './shared/pipes/strong-password-pattern.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  providers: [MediumPasswordPatternPipe, StrongPasswordPatternPipe],
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

  constructor(
    private strongPasswordPatternPipe: StrongPasswordPatternPipe,
    private mediumPasswordPatterPipe: MediumPasswordPatternPipe
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkStrength(): void {
    if (!this.password) {
      this.passwordStrength = PASSWORD_COMPLEXITY.EMPTY;
    } else if (this.password.length < this.MIN_PASSWORD_LENGTH) {
      this.passwordStrength = PASSWORD_COMPLEXITY.TOO_SHORT;
    } else if (this.strongPasswordPatternPipe.transform(this.password)) {
      this.passwordStrength = PASSWORD_COMPLEXITY.STRONG;
    } else if (this.mediumPasswordPatterPipe.transform(this.password)) {
      this.passwordStrength = PASSWORD_COMPLEXITY.MEDIUM;
    } else {
      this.passwordStrength = PASSWORD_COMPLEXITY.WEAK;
    }
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
