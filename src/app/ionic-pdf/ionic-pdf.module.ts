import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicPdfPageRoutingModule } from './ionic-pdf-routing.module';

import { IonicPdfPage } from './ionic-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPdfPageRoutingModule
  ],
  declarations: [IonicPdfPage],
})
export class IonicPdfPageModule {}
