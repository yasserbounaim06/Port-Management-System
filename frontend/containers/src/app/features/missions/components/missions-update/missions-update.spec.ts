import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsUpdate } from './missions-update';

describe('MissionsUpdate', () => {
  let component: MissionsUpdate;
  let fixture: ComponentFixture<MissionsUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
