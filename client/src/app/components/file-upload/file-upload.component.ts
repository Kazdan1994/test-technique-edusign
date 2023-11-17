import { Component, forwardRef } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  public formControl: FormControl;
  public fileList: NzUploadFile[] = [];

  private onChange: (value: File) => void = () => {
    /**/
  };
  private onTouched: () => void = () => {
    /**/
  };

  constructor(/* private readonly http: HttpClient, private readonly msg: NzMessageService */) {
    this.formControl = new FormControl('');
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [file];
    return false;
  };

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
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      this.onChange(files[0]);
    }
  }
}
