import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { emailListValidator } from '../../../validators/email-list.validator';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  public validateForm: FormGroup;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private notification: NzNotificationService,
    private http: HttpClient,
  ) {
    const { required, email } = Validators;
    this.validateForm = this.fb.group({
      fileDocument: [null, [required]],
      emailEtudiant: ['student@edusign.fr', [required, email]],
      emailsIntervenants: [
        ['intervenant1@edusign.fr', 'intervenant2@edusign.fr'],
        [required, emailListValidator()],
      ],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData = new FormData();

      formData.append('file', this.validateForm.value.fileDocument as File);
      formData.append(
        'student',
        this.validateForm.value.emailEtudiant as string,
      );
      formData.append(
        'external',
        (this.validateForm.value.emailsIntervenants as string[]).join(','),
      );

      this.http
        .post('http://localhost:8080/sendDocument', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .pipe(
          catchError((error) => {
            console.error('Error in post request', error);

            return throwError(error);
          }),
        )
        .subscribe((response) => {
          console.log('Post request successful', response);

          this.notification.create(
            'success',
            'Envoyé!',
            'Vos informations ont été envoyées',
          );
        });
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
