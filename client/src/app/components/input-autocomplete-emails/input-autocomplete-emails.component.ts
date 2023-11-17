import { Component } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

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
  public formControl: FormControl;

  private onChange: (value: string) => void = () => {
    /**/
  };
  private onTouched: () => void = () => {
    /**/
  };

  constructor() {
    this.formControl = new FormControl('');
  }

  writeValue(value: () => void): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    this.onChange((event.target as HTMLInputElement).value);
  }
}
