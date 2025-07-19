import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationsList } from './occupations-list';

describe('OccupationsList', () => {
  let component: OccupationsList;
  let fixture: ComponentFixture<OccupationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
