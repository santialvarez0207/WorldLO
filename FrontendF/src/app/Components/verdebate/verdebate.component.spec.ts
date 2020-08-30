import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdebateComponent } from './verdebate.component';

describe('VerdebateComponent', () => {
  let component: VerdebateComponent;
  let fixture: ComponentFixture<VerdebateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdebateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
