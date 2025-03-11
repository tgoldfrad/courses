import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetailesComponent } from './lesson-detailes.component';

describe('LessonDetailesComponent', () => {
  let component: LessonDetailesComponent;
  let fixture: ComponentFixture<LessonDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonDetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
