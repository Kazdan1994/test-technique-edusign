import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [NzUploadModule, NzIconModule],
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
