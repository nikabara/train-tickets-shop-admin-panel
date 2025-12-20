import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVagonComponent } from './add-vagon.component';

describe('AddVagonComponent', () => {
  let component: AddVagonComponent;
  let fixture: ComponentFixture<AddVagonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVagonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
