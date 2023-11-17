import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzInputModule,
    NzGridModule,
    NzFormModule,
    FormsModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzUploadModule,
    NzIconModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
