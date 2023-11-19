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
      emailEtudiant: ['', [required, email]],
      emailsIntervenants: [[''], [required, emailListValidator()]],
    });
  }

  toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      const { fileDocument, emailEtudiant, emailsIntervenants } =
        this.validateForm.value;

      this.http
        .post('http://localhost:8080/sendDocument', {
          file: await this.toBase64(fileDocument[0]),
          student: emailEtudiant,
          external: emailsIntervenants,
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
