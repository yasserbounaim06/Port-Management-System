import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCreate } from './container-create';

describe('ContainerCreate', () => {
  let component: ContainerCreate;
  let fixture: ComponentFixture<ContainerCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
