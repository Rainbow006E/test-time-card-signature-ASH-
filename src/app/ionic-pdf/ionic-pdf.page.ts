import { Component, OnInit } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';
// require('jspdf-autotable');
import { autoTable } from 'jspdf-autotable';
import domtoimage from 'dom-to-image';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { SignaturePage } from '../signature/signature.page';
// import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-ionic-pdf',
  templateUrl: './ionic-pdf.page.html',
  styleUrls: ['./ionic-pdf.page.scss'],
})
export class IonicPdfPage implements OnInit {
  private loading: any;
  private datas = [
    {day: 'Mon', in: '12.21', out: '14.21', hours: 2},
    {day: 'Tue', in: '12.21', out: '14.21', hours: 2},
    {day: 'Wen', in: '12.21', out: '14.21', hours: 2},
    {day: 'Thu', in: '12.21', out: '14.21', hours: 2},
    {day: 'Fri', in: '12.21', out: '14.21', hours: 2},
  ];
  public workerSign: any;
  public clientSign: any;
  private image: any;
  private sign: any;

  constructor(public loadingCtrl: LoadingController,
              private file: File,
              private httpClient: HttpClient,
              private fileOpener: FileOpener,
              public modalController: ModalController
              ) { }

  ngOnInit() {
    // createInvoice(workersign);
    // doc.addHTML(document.getElementById('printable-area'), 20, 30, {}, () => {
    //   doc.save('test.pdf');
    // });
    // const Headers = new Headers{ name: 'name', sfe, 180, 'center', 5};
    // const headers = new Headers();
    // headers.append('name', 'name');
    // headers.append('prompt', 'name');
    // headers.append('width', '180');
    // headers.append('aligh', 'center');
    // headers.append('padding', '12');
    // doc.table(20, 200, this.datas, headers, 'wef');
    // doc.autoTable({html: document.getElementsByClassName('detail-table')});
    // doc.output('save', 'filename.pdf');
  }

  createInvoice(workersign, clientSign) {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(20);
    doc.setLineHeightFactor(1.5);
    doc.text(['WEEK ENDING DATE', 'LAST OF SOCIAL', 'WORKER NAME'], 20, 30);
    doc.line(20, 60, 190, 60);
    doc.line(20, 74, 190, 74);

    doc.line(20, 60, 20, 144);
    doc.line(50, 60, 50, 144);
    doc.line(105, 60, 105, 144);
    doc.line(160, 60, 160, 144);
    doc.line(190, 60, 190, 144);

    doc.text('Day', 35, 70, 'center');
    doc.text('In', 77.5, 70, 'center');
    doc.text('Out', 132.5, 70, 'center');
    doc.text('Hours', 175, 70, 'center');
    this.datas.forEach((item, index) => {
      doc.line(20, 74 + 14 * (index + 1), 190, 74 + 14 * (index + 1));
      doc.text(item.day, 35, 70 + 14 * (index + 1), 'center');
      doc.text(item.in, 77.5, 70 + 14 * (index + 1), 'center');
      doc.text(item.out, 132.5, 70 + 14 * (index + 1), 'center');
      doc.text(String(item.hours), 175, 70 + 14 * (index + 1), 'center');
    });

    doc.text('Total hours', 132.5, 156, 'center');
    doc.text(String(10), 175, 156, 'center');

    doc.text('WORKER SIGN', 20, 180, 'left');
    doc.text('CLIENT SIGN', 105, 180, 'left');

    doc.addImage(workersign, 'PNG', 20, 187, 60 , 60 / 1.7);
    doc.addImage(clientSign, 'PNG', 105, 187, 60 , 60 / 1.7);

    console.log(doc);
    doc.save('invoice.pdf');
    return doc.output();
  }

  async presentLoading(msg) {
    this.loading = await this.loadingCtrl.create({
      message: msg
    });
    return await this.loading.present();
  }

  fromHTML() {
    // const doc = new jsPDF();
    // doc.fromHTML(document.getElementById('printable-area'), 15, 15, {
    //   width: 170
    // });
    // doc.save('test.pdf');

    const pdf = new jsPDF('p', 'pt', 'letter');
    const source = document.getElementById('printable-area');
    const margins = {
      top: 80,
      bottom: 60,
      left: 10,
      width: 700
    };
    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, { // y coord
        width: margins.width, // max width of content on PDF
      },
      (dispose) => {
          pdf.save('Test.pdf');
      },
      margins
    );
  }

  addHTML() {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.addHTML(document.body, () => {
      const stringT = doc.output('datauristring');
      document.querySelector('img')[0].attr('src', stringT);
    });
  }

  exportPdf() {
    const binaryPdf = this.createInvoice(this.workerSign, this.clientSign);
    console.log(binaryPdf);
    // const formData = new FormData();
    // formData.append('profile', 'file:///C:/Users/NewsDev/Downloads/invoice.pdf');

    this.httpClient.post<any>('http://localhost:5000/api/saveWithBinary', {file: binaryPdf} ).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    // this.addHTML();
    // this.fromHTML();
    // this.presentLoading('Creating PDF file...');
    // const div = document.getElementById('printable-area');
    // const options = { background: 'white', height: div.clientHeight, width: div.clientWidth };
    // console.log(div);
    // domtoimage.toPng(div, options).then((dataUrl) => {
    //   console.log('test : ', div.clientWidth);
    //   console.log('test : ', div.clientHeight);
    //   const doc = new jsPDF('p', 'mm', 'a4');
    //   doc.addImage(dataUrl, 'PNG', 20, 20, 170, 170 * div.clientHeight / div.clientWidth);
    //   this.image = dataUrl;
    //   console.log(this.image);
    //   // this.loading.dismiss();

    //   const pdfOutput = doc.output();
    //   console.log('pdfOutput : ', pdfOutput);
    //   // using ArrayBuffer will allow you to put image inside PDF
    //   const buffer = new ArrayBuffer(pdfOutput.length);
    //   const array = new Uint8Array(buffer);
    //   for (let i = 0; i < pdfOutput.length; i++) {
    //     array[i] = pdfOutput.charCodeAt(i);
    //   }
    //   const formData = new FormData();
    //   formData.append('profile', pdfOutput);

    //   this.httpClient.post<any>('http://localhost:5000/api/savepdf', formData).subscribe(
    //     (res) => console.log(res),
    //     (err) => console.log(err)
    //   );

    //   // const directory = this.file.dataDirectory ;
    //   // const fileName = 'invoice.pdf';
    //   // // tslint:disable-next-line: no-shadowed-variable
    //   // const options: IWriteOptions = { replace: true };
    //   // console.log('test : ', pdfOutput);

    //   // this.file.checkFile(directory, fileName).then((success) => {
    //   //   this.file.writeFile(directory, fileName, buffer, options)
    //   //   .then((Subsuccess) => {
    //   //     this.loading.dismiss();
    //   //     console.log('File created Succesfully' + JSON.stringify(success));
    //   //     this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
    //   //       .then(() => console.log('File is opened'))
    //   //       .catch(e => console.log('Error opening file', e));
    //   //   })
    //   //   .catch((error) => {
    //   //     this.loading.dismiss();
    //   //     console.log('Cannot Create File ' + JSON.stringify(error));
    //   //   });
    //   // })
    //   // .catch((error) => {
    //   //   this.file.writeFile(directory, fileName, buffer)
    //   //   .then((success) => {
    //   //     this.loading.dismiss();
    //   //     console.log('File created Succesfully' + JSON.stringify(success));
    //   //     this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
    //   //       .then(() => console.log('File is opened'))
    //   //       .catch(e => console.log('Error opening file', e));
    //   //   })
    //   //   .catch((Suberror) => {
    //   //     this.loading.dismiss();
    //   //     console.log('Cannot Create File ' + JSON.stringify(error));
    //   //   });
    //   // });
    // })
    // .catch((error) => {
    //   this.loading.dismiss();
    //   console.error('oops, something went wrong!', error);
    // });
  }

  openWorkerSign() {
    this.sign = 'worker';
    this.openSignatureModel();
  }

  openClientSign() {
    this.sign = 'client';
    this.openSignatureModel();
  }

  async openSignatureModel() {
    const signModal = await this.modalController.create({
      component: SignaturePage
    });

    signModal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != null) {
          if (this.sign === 'worker') {
            this.workerSign = dataReturned.data;
          } else if (this.sign === 'client') {
            this.clientSign = dataReturned.data;
          }
        }
      }
    });

    return await signModal.present();
  }

}
