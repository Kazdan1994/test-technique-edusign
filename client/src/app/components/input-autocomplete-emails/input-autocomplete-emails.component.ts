import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-autocomplete-emails',
  templateUrl: './input-autocomplete-emails.component.html',
  styleUrls: ['./input-autocomplete-emails.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputAutocompleteEmailsComponent,
      multi: true,
    },
  ],
})
export class InputAutocompleteEmailsComponent implements ControlValueAccessor {
  public emails: string[] = [];

  public onChange: (value: string[]) => void = () => {
    /**/
  };
  private onTouched: () => void = () => {
    /**/
  };

  writeValue(value: string[]): void {
    if (value && this.areEmailsValid(value)) {
      this.emails = value;
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private areEmailsValid(emails: string[]): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emails.every((email) => emailRegex.test(email));
  }
}
