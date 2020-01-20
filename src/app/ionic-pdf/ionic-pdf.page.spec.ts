import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicPdfPage } from './ionic-pdf.page';

describe('IonicPdfPage', () => {
  let component: IonicPdfPage;
  let fixture: ComponentFixture<IonicPdfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicPdfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
