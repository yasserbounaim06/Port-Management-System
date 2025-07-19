import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretsCreate } from './arrets-create';

describe('ArretsCreate', () => {
  let component: ArretsCreate;
  let fixture: ComponentFixture<ArretsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArretsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArretsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
