import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginsCreate } from './engins-create';

describe('EnginsCreate', () => {
  let component: EnginsCreate;
  let fixture: ComponentFixture<EnginsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnginsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnginsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
