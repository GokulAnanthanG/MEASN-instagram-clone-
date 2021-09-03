import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgtvComponent } from './igtv.component';

describe('IgtvComponent', () => {
  let component: IgtvComponent;
  let fixture: ComponentFixture<IgtvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgtvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
