import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Committees } from './committees';

describe('Committees', () => {
  let component: Committees;
  let fixture: ComponentFixture<Committees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Committees],
    }).compileComponents();

    fixture = TestBed.createComponent(Committees);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
