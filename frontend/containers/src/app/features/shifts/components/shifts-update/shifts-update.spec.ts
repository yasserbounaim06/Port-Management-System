import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsUpdate } from './shifts-update';

describe('ShiftsUpdate', () => {
  let component: ShiftsUpdate;
  let fixture: ComponentFixture<ShiftsUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftsUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
