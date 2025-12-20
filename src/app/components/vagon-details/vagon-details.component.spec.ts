import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagonDetailsComponent } from './vagon-details.component';

describe('VagonDetailsComponent', () => {
  let component: VagonDetailsComponent;
  let fixture: ComponentFixture<VagonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagonDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
