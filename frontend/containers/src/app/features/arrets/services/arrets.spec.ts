import { TestBed } from '@angular/core/testing';

import { Arrets } from './arrets';

describe('Arrets', () => {
  let service: Arrets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arrets);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
