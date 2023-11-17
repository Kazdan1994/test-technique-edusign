import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {NzUploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  listOfOption: string[] = [];
  fileList: NzUploadFile[] = [];

  validateForm: FormGroup<{
    file: FormControl<string>;
    emailEtudiant: FormControl<string>;
    emailsIntervenants: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    const { required, email } = Validators;
    this.validateForm = this.fb.group({
      file: ['', [required]],
      emailEtudiant: ['', [required, email]],
      emailsIntervenants: ['', [required, email]],
    });
  }

  ngOnInit(): void {
    this.listOfOption = [];
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  submitForm() {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
