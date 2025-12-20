import { TestBed } from '@angular/core/testing';

import { VagonService } from './vagon.service';

describe('VagonService', () => {
  let service: VagonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VagonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
