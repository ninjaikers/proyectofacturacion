import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturanuevaComponent } from './facturanueva.component';

describe('FacturanuevaComponent', () => {
  let component: FacturanuevaComponent;
  let fixture: ComponentFixture<FacturanuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturanuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturanuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
