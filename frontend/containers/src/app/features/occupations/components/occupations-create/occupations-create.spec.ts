import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationsCreate } from './occupations-create';

describe('OccupationsCreate', () => {
  let component: OccupationsCreate;
  let fixture: ComponentFixture<OccupationsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupationsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
