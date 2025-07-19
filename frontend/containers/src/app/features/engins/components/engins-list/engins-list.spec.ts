import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginsList } from './engins-list';

describe('EnginsList', () => {
  let component: EnginsList;
  let fixture: ComponentFixture<EnginsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnginsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnginsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
