import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediumPasswordPattern',
  standalone: true,
})
export class MediumPasswordPatternPipe implements PipeTransform {
  private readonly latinLettersRegex: RegExp = /[a-zA-Z]/;
  private readonly digitsRegex: RegExp = /\d/;
  private readonly specialSymbolsRegex: RegExp =
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  transform(password: string): boolean {
    return (
      (this.latinLettersRegex.test(password) &&
        this.digitsRegex.test(password)) ||
      (this.digitsRegex.test(password) &&
        this.specialSymbolsRegex.test(password)) ||
      (this.latinLettersRegex.test(password) &&
        this.specialSymbolsRegex.test(password))
    );
  }
}
