import { Component, OnInit } from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  uploading = false;
  fileList: NzUploadFile[] = [];

  constructor() { }

  ngOnInit() {
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  submitForm() {
    console.log('submit')
  }
}
