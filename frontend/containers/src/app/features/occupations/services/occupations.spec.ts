import { TestBed } from '@angular/core/testing';

import { Occupations } from './occupations';

describe('Occupations', () => {
  let service: Occupations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Occupations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
