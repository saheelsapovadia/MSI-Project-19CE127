import { TestBed } from '@angular/core/testing';

import { MarvelapiService } from './marvelapi.service';

describe('MarvelapiService', () => {
  let service: MarvelapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarvelapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
