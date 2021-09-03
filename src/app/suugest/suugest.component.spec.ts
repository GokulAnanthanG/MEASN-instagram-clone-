import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuugestComponent } from './suugest.component';

describe('SuugestComponent', () => {
  let component: SuugestComponent;
  let fixture: ComponentFixture<SuugestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuugestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuugestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
