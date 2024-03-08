import { Component } from '@angular/core';
import { PASSWORD_COMPLEXITY } from '../../constants/enums';
import { StrongPasswordPatternPipe } from '../../pipes/strong-password-pattern.pipe';
import { MediumPasswordPatternPipe } from '../../pipes/medium-password-pattern.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength-checker',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [MediumPasswordPatternPipe, StrongPasswordPatternPipe],
  templateUrl: './password-strength-checker.component.html',
  styleUrl: './password-strength-checker.component.scss',
})
export class PasswordStrengthCheckerComponent {
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
}
