import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathStarComponent } from './death-star.component';

describe('DeathStarComponent', () => {
  let component: DeathStarComponent;
  let fixture: ComponentFixture<DeathStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
