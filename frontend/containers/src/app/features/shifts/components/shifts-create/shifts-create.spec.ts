import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsCreate } from './shifts-create';

describe('ShiftsCreate', () => {
  let component: ShiftsCreate;
  let fixture: ComponentFixture<ShiftsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
