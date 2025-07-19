import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretsUpdate } from './arrets-update';

describe('ArretsUpdate', () => {
  let component: ArretsUpdate;
  let fixture: ComponentFixture<ArretsUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArretsUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArretsUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
