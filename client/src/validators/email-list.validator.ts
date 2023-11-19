import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailListValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailList: string[] = control.value;

    if (!emailList || !Array.isArray(emailList)) {
      return { invalidEmailList: true };
    }

    for (const email of emailList) {
      if (!isValidEmail(email)) {
        return { invalidEmailList: true };
      }
    }

    return null;
  };
}

// A simple email validation function
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
