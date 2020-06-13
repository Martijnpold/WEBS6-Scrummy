import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemComponent } from './project-item.component';
import { MatDialog } from '@angular/material/dialog';
import { AppMaterialModule } from 'src/app/app-material.module';
import { Component } from '@angular/core';
import { Project } from 'src/app/model/project';

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

  const matMockDialog = {
    open: function (a, b) {
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectItemComponent],
      providers: [
        { provide: MatDialog, useValue: matMockDialog }
      ],
      imports: [
        AppMaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    component.project = new Project();
    component.project.name = 'test name';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
