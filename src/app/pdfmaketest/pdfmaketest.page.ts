import { Component, OnInit } from '@angular/core';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { NavController, ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-pdfmaketest',
  templateUrl: './pdfmaketest.page.html',
  styleUrls: ['./pdfmaketest.page.scss'],
})
export class PdfmaketestPage implements OnInit {

  constructor(public toastCtrl: ToastController, public file: File) { }

  ngOnInit() {
  }

  // makePdf() {
  //   pdfmake.vfs = pdfFonts.pdfMake.vfs;
  //   const docDefinition = {
  //     content: [
  //       {
  //         columns: [
  //           {
  //             // tslint:disable-next-line: max-line-length
  //             image: 'data:image/png;base64,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',
  //             fit: [100, 100]
  //           },
  //           [
  //             { text: 'BITCOIN', style: 'header' },
  //             { text: 'Cryptocurrency Payment System', style: 'sub_header' },
  //             { text: 'WEBSITE: https://bitcoin.org/', style: 'url' },
  //           ]
  //         ]
  //       }
  //     ],
  //     styles: {
  //       header: {
  //         bold: true,
  //         fontSize: 20,
  //         alignment: 'right'
  //       },
  //       sub_header: {
  //         fontSize: 18,
  //         alignment: 'right'
  //       },
  //       url: {
  //         fontSize: 16,
  //         alignment: 'right'
  //       }
  //     },
  //     pageSize: 'A4',
  //     pageOrientation: 'portrait'
  //   };
  //   // pdfmake.createPdf(docDefinition).open();

  //   pdfmake.createPdf(docDefinition).getBuffer((buffer) => {
  //     const utf8 = new Uint8Array(buffer);
  //     const binaryArray = utf8.buffer;
  //     this.saveToDevice(binaryArray, 'Bitcoin.pdf');
  //   });
  // }

  // async saveToDevice(data: any, savefile: any) {
  //   this.file.writeFile(this.file.externalDataDirectory, savefile, data, { replace: false });
  //   const toast = await this.toastCtrl.create({
  //     message: 'File saved to your device',
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   toast.present();
  // }
}
