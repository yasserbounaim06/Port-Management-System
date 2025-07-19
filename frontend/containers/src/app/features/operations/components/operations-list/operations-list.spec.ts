import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsList } from './operations-list';

describe('OperationsList', () => {
  let component: OperationsList;
  let fixture: ComponentFixture<OperationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
