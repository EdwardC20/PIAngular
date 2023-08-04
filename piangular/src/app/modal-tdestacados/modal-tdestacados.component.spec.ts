import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTdestacadosComponent } from './modal-tdestacados.component';

describe('ModalTdestacadosComponent', () => {
  let component: ModalTdestacadosComponent;
  let fixture: ComponentFixture<ModalTdestacadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTdestacadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTdestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
