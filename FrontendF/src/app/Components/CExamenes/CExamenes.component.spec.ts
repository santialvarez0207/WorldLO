import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CExamenesComponent } from './CExamenes.component';

describe('UsuariosComponent', () => {
  let component:  CExamenesComponent;
  let fixture: ComponentFixture< CExamenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  CExamenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CExamenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
