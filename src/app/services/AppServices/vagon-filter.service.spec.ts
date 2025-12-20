import { TestBed } from '@angular/core/testing';

import { VagonFilterService } from './vagon-filter.service';

describe('VagonFilterService', () => {
  let service: VagonFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VagonFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
