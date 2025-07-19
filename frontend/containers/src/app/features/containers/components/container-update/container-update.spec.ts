import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUpdate } from './container-update';

describe('ContainerUpdate', () => {
  let component: ContainerUpdate;
  let fixture: ComponentFixture<ContainerUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
