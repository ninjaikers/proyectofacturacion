import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprecionFacturaComponent } from './imprecion-factura.component';

describe('ImprecionFacturaComponent', () => {
  let component: ImprecionFacturaComponent;
  let fixture: ComponentFixture<ImprecionFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprecionFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprecionFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
