import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCreate } from './operations-create';

describe('OperationsCreate', () => {
  let component: OperationsCreate;
  let fixture: ComponentFixture<OperationsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
