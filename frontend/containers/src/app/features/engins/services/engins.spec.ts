import { TestBed } from '@angular/core/testing';

import { Engins } from './engins';

describe('Engins', () => {
  let service: Engins;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Engins);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
