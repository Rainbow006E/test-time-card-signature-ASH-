import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PdfmaketestPage } from './pdfmaketest.page';

describe('PdfmaketestPage', () => {
  let component: PdfmaketestPage;
  let fixture: ComponentFixture<PdfmaketestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfmaketestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfmaketestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
