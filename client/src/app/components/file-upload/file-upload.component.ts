import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.sass'],
})
export class FileUploadComponent {
  uploading = false;
  fileList: NzUploadFile[] = [];

  // constructor (private readonly http: HttpClient, private readonly msg: NzMessageService) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
}
