import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVagonsComponent } from './manage-vagons.component';

describe('ManageVagonsComponent', () => {
  let component: ManageVagonsComponent;
  let fixture: ComponentFixture<ManageVagonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVagonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVagonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
