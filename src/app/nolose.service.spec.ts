import { TestBed } from '@angular/core/testing';

import { NoloseService } from './nolose.service';

describe('NoloseService', () => {
  let service: NoloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
