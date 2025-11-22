import { TestBed } from '@angular/core/testing';

import { RailwayticketsApiService } from './railwaytickets-api.service';

describe('RailwayticketsApiService', () => {
  let service: RailwayticketsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RailwayticketsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
