import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationsUpdate } from './occupations-update';

describe('OccupationsUpdate', () => {
  let component: OccupationsUpdate;
  let fixture: ComponentFixture<OccupationsUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationsUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupationsUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
