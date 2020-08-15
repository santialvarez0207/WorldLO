import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GVisualizecomponent } from './Gvisualize.component';

describe('UsuariosComponent', () => {
  let component:  GVisualizecomponent;
  let fixture: ComponentFixture< GVisualizecomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  GVisualizecomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GVisualizecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
