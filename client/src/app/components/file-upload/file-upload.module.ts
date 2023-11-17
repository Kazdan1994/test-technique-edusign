import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    NzUploadModule,
    NzIconModule,
    FormsModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
