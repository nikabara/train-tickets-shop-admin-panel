import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateQrComponent } from './validate-qr.component';

describe('ValidateQrComponent', () => {
  let component: ValidateQrComponent;
  let fixture: ComponentFixture<ValidateQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
