import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsCreate } from './missions-create';

describe('MissionsCreate', () => {
  let component: MissionsCreate;
  let fixture: ComponentFixture<MissionsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
