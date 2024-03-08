import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordStrengthCheckerComponent } from './password-strength-checker.component';
import { StrongPasswordPatternPipe } from '../../pipes/strong-password-pattern.pipe';
import { MediumPasswordPatternPipe } from '../../pipes/medium-password-pattern.pipe';
import { PASSWORD_COMPLEXITY } from '../../constants/enums';

describe('PasswordStrengthCheckerComponent', () => {
  let component: PasswordStrengthCheckerComponent;
  let fixture: ComponentFixture<PasswordStrengthCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PasswordStrengthCheckerComponent,
        StrongPasswordPatternPipe,
        MediumPasswordPatternPipe,
      ],
      imports: [FormsModule, CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize passwordStrength as empty', () => {
    expect(component.passwordStrength).toEqual('');
  });

  it('should initialize showPassword as false', () => {
    expect(component.showPassword).toEqual(false);
  });

  it('should toggle password visibility', () => {
    component.showPassword = false;
    component.togglePasswordVisibility();
    expect(component.showPassword).toEqual(true);
    component.togglePasswordVisibility();
    expect(component.showPassword).toEqual(false);
  });

  it('should set password strength as EMPTY when password is empty', () => {
    component.password = '';
    component.checkStrength();
    expect(component.passwordStrength).toEqual(PASSWORD_COMPLEXITY.EMPTY);
  });

  it('should set password strength as TOO_SHORT when password is less than the minimum length', () => {
    component.password = 'abc';
    component.checkStrength();
    expect(component.passwordStrength).toEqual(PASSWORD_COMPLEXITY.TOO_SHORT);
  });

  it('should set password strength as STRONG when password is strong', () => {
    const strongPassword = 'P@ssw0rd';
    component.password = strongPassword;
    component.checkStrength();
    expect(component.passwordStrength).toEqual(PASSWORD_COMPLEXITY.STRONG);
  });

  it('should set password strength as MEDIUM when password is medium', () => {
    const mediumPassword = 'Password123';
    component.password = mediumPassword;
    component.checkStrength();
    expect(component.passwordStrength).toEqual(PASSWORD_COMPLEXITY.MEDIUM);
  });

  it('should set password strength as WEAK when password is weak', () => {
    const weakPassword = 'password';
    component.password = weakPassword;
    component.checkStrength();
    expect(component.passwordStrength).toEqual(PASSWORD_COMPLEXITY.WEAK);
  });
});
