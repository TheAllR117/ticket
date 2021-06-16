import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodePage } from './code.page';

describe('CodePage', () => {
  let component: CodePage;
  let fixture: ComponentFixture<CodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
