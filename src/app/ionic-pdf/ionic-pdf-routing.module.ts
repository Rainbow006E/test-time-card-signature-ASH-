import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicPdfPage } from './ionic-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: IonicPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IonicPdfPageRoutingModule {}
