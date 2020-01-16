import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController} from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {
  @ViewChild(SignaturePad, { static: false }) public signaturePad: SignaturePad;

  public signaturePadOptions: object = {
    minWidth: 2,
    canvasWidth: 340,
    canvasHeight: 200,
  };

  public signatureImage: string;

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async drawCancel() {
    await this.modalController.dismiss();
  }

  async drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    console.log('test signature pad : ', this.signaturePad);
    console.log(JSON.stringify(this.signatureImage));
    await this.modalController.dismiss(this.signatureImage);
  }

  drawClear() {
    this.signaturePad.clear();
  }

  canvasResize() {
    const canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 2);
    this.signaturePad.set('canvasWidth', 340);
    this.signaturePad.set('canvasHeight', 200);
    // this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    // this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  AfterViewInit() {
    this.signaturePad.clear();
    this.canvasResize();
  }
}
