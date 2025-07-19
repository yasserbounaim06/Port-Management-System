import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviresList } from './navires-list';

describe('NaviresList', () => {
  let component: NaviresList;
  let fixture: ComponentFixture<NaviresList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaviresList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaviresList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
