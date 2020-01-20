import { Component, Injectable  } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { SignaturePage } from '../signature/signature.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public signatureImage: any;

  constructor(public navCtrl: NavController, public modalController: ModalController) {
  }

  async openSignatureModel() {
    const signModal = await this.modalController.create({
      component: SignaturePage
    });

    signModal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data != null) {
          this.signatureImage = dataReturned.data;
        }
      }
    });

    return await signModal.present();
  }

  async createNewPdf() {
    // const doc = await PDFNet.PDFDoc.create();

    // // optionally perform some document processing using read write operations
    // // found under 'Editing Page Content' or 'Page Manipulation'

    // // save the document to a memory buffer
    // const buf = await doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_linearized);

    // // optionally save the document to the filesystem
    // saveAs(new Blob([buf], {type: 'application/pdf'}), 'test.pdf');
  }
}

