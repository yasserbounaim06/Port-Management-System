import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretsList } from './arrets-list';

describe('ArretsList', () => {
  let component: ArretsList;
  let fixture: ComponentFixture<ArretsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArretsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArretsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
