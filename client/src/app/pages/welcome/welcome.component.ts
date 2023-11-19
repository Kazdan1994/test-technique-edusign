import { Component, type OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { emailListValidator } from '../../../validators/email-list.validator';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  listOfOption: string[] = [];

  validateForm: FormGroup<{
    file: FormControl<string>;
    emailEtudiant: FormControl<string>;
    emailsIntervenants: FormControl<string>;
  }>;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private notification: NzNotificationService,
  ) {
    const { required, email } = Validators;
    this.validateForm = this.fb.group({
      file: ['', [required]],
      emailEtudiant: ['', [required, email]],
      emailsIntervenants: ['', [required, emailListValidator()]],
    });
  }

  ngOnInit(): void {
    this.listOfOption = [];
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.notification.create(
        'success',
        'Envoyé!',
        'Vos informations ont été envoyées',
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
