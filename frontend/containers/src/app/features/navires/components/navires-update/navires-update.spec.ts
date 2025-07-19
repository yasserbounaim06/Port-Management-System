import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviresUpdate } from './navires-update';

describe('NaviresUpdate', () => {
  let component: NaviresUpdate;
  let fixture: ComponentFixture<NaviresUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaviresUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaviresUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
