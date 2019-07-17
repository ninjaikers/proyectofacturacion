import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaactualizarComponent } from './facturaactualizar.component';

describe('FacturaactualizarComponent', () => {
  let component: FacturaactualizarComponent;
  let fixture: ComponentFixture<FacturaactualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaactualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaactualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
