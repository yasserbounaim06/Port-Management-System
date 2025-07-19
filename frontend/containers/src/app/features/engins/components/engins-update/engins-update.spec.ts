import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginsUpdate } from './engins-update';

describe('EnginsUpdate', () => {
  let component: EnginsUpdate;
  let fixture: ComponentFixture<EnginsUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnginsUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnginsUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
