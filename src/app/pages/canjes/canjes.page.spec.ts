import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CanjesPage } from './canjes.page';

describe('CanjesPage', () => {
  let component: CanjesPage;
  let fixture: ComponentFixture<CanjesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanjesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CanjesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
