import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ionic-pdf', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'signature',
    loadChildren: () => import('./signature/signature.module').then( m => m.SignaturePageModule)
  },
  {
    path: 'pdfmaketest',
    loadChildren: () => import('./pdfmaketest/pdfmaketest.module').then( m => m.PdfmaketestPageModule)
  },
  {
    path: 'ionic-pdf',
    loadChildren: () => import('./ionic-pdf/ionic-pdf.module').then( m => m.IonicPdfPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
