import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfmaketestPageRoutingModule } from './pdfmaketest-routing.module';

import { PdfmaketestPage } from './pdfmaketest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfmaketestPageRoutingModule
  ],
  declarations: [PdfmaketestPage]
})
export class PdfmaketestPageModule {}
