import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamcVisualiomponent } from './Examenes.component';

describe('UsuariosComponent', () => {
  let component:  ExamcVisualiomponent;
  let fixture: ComponentFixture< ExamcVisualiomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ExamcVisualiomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamcVisualiomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
