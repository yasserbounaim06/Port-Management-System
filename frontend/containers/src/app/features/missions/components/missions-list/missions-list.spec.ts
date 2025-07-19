import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsList } from './missions-list';

describe('MissionsList', () => {
  let component: MissionsList;
  let fixture: ComponentFixture<MissionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
