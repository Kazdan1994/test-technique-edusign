import { Component, HostListener, forwardRef } from '@angular/core';
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
  public fileList: NzUploadFile[] = [];
  formControl: FormControl;
  public fileDocument: {
    uid: string;
    isUploading: boolean;
    message: string;
    isImageUrl: boolean;
    iconType: string;
    showDownload: boolean;
  } = {
    uid: '',
    isUploading: false,
    message: '',
    isImageUrl: false,
    iconType: '',
    showDownload: false,
  };

  onChange: (value: NzUploadFile[]) => void = () => {
    /**/
  };
  private onTouched: () => void = () => {
    /**/
  };

  constructor() {
    this.formControl = new FormControl('');
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [file];
    this.fileDocument = {
      uid: file.uid,
      isUploading: file['isUploading'],
      message: file['message'],
      isImageUrl: file['isImageUrl'],
      iconType: file['iconType'],
      showDownload: file['showDownload'],
    };

    this.formControl.setValue(this.fileDocument);

    return false;
  };

  writeValue(value: NzUploadFile[]): void {
    this.onChange(value);
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
      this.onChange(files as unknown as NzUploadFile[]);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      this.onChange(files as unknown as NzUploadFile[]);
    }
  }
}
