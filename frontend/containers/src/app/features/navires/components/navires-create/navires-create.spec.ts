import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviresCreate } from './navires-create';

describe('NaviresCreate', () => {
  let component: NaviresCreate;
  let fixture: ComponentFixture<NaviresCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaviresCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaviresCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
