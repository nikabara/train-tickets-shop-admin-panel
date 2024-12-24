import { TestBed } from '@angular/core/testing';

import { SwaggerApiService } from './swagger-api.service';

describe('SwaggerApiService', () => {
  let service: SwaggerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwaggerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
