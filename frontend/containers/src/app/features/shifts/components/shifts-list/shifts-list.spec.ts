import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsList } from './shifts-list';

describe('ShiftsList', () => {
  let component: ShiftsList;
  let fixture: ComponentFixture<ShiftsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
