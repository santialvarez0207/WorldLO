import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfileComponent } from './Porfile.component';

describe('UsuariosComponent', () => {
  let component: PorfileComponent;
  let fixture: ComponentFixture< PorfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  PorfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
