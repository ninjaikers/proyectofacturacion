import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonImpresionFacturaComponent } from './boton-impresion-factura.component';

describe('BotonImpresionFacturaComponent', () => {
  let component: BotonImpresionFacturaComponent;
  let fixture: ComponentFixture<BotonImpresionFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonImpresionFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonImpresionFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
