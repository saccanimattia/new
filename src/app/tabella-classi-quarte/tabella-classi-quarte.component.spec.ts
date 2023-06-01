import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaClassiQuarteComponent } from './tabella-classi-quarte.component';

describe('TabellaClassiQuarteComponent', () => {
  let component: TabellaClassiQuarteComponent;
  let fixture: ComponentFixture<TabellaClassiQuarteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabellaClassiQuarteComponent]
    });
    fixture = TestBed.createComponent(TabellaClassiQuarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
