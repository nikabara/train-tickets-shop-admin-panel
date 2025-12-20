import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVagonComponent } from './edit-vagon.component';

describe('EditVagonComponent', () => {
  let component: EditVagonComponent;
  let fixture: ComponentFixture<EditVagonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVagonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
