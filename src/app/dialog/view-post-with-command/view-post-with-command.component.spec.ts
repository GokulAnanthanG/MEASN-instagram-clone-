import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostWithCommandComponent } from './view-post-with-command.component';

describe('ViewPostWithCommandComponent', () => {
  let component: ViewPostWithCommandComponent;
  let fixture: ComponentFixture<ViewPostWithCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostWithCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostWithCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
