import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsUpdate } from './operations-update';

describe('OperationsUpdate', () => {
  let component: OperationsUpdate;
  let fixture: ComponentFixture<OperationsUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
