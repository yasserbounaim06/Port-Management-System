import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelUpdate } from './personnel-update';

describe('PersonnelUpdate', () => {
  let component: PersonnelUpdate;
  let fixture: ComponentFixture<PersonnelUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
