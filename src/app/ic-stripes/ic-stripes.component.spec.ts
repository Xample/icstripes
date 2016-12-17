/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IcStripesComponent } from './ic-stripes.component';

describe('IcStripesComponent', () => {
  let component: IcStripesComponent;
  let fixture: ComponentFixture<IcStripesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcStripesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcStripesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
