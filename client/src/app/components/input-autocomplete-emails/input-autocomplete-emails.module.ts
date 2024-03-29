import { NgModule } from '@angular/core';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { InputAutocompleteEmailsComponent } from './input-autocomplete-emails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgForOf } from '@angular/common';

@NgModule({
  imports: [
    NzUploadModule,
    NzIconModule,
    FormsModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    NgForOf,
  ],
  declarations: [InputAutocompleteEmailsComponent],
  exports: [InputAutocompleteEmailsComponent],
})
export class InputAutocompleteEmailsModule {}
