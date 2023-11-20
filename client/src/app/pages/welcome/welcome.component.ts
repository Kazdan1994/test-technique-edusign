import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { emailListValidator } from '../../../validators/email-list.validator';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

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
      emailStudent: ['', [required, email]],
      emailsExternals: [[''], [required, emailListValidator()]],
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
      const { fileDocument, emailStudent, emailsExternals } =
        this.validateForm.value;

      this.http
        .post(`${environment.apiUrl}/sendDocument`, {
          file: await this.toBase64(fileDocument[0]),
          student: emailStudent,
          external: emailsExternals,
        })
        .pipe(
          catchError(({ error }) => {
            this.notification.create('error', error.errorCode, error.message);

            return throwError(error);
          }),
        )
        .subscribe(() => {
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
