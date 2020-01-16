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
}
