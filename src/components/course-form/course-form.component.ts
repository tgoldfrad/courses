import { Component, Inject} from '@angular/core';
import { Course } from '../../models/course';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent {

  currentCourse!: Course;
  addCourseForm!: FormGroup;
  courseId?: number;

  constructor(private courseService: CourseService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private dialogRef: MatDialogRef<CourseFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { course: Course }) { }

  ngOnInit(): void {
    this.currentCourse = this.data.course;
    this.addCourseForm = this.fb.group({
      title: [this.currentCourse?.title || '', Validators.required],
      description: [this.currentCourse?.description || '', Validators.required],
      teacherId: [this.currentCourse?.teacherId || '', Validators.required]

    })

  }
  onSubmit(): void {
    if (this.addCourseForm.valid) {

      if (this.currentCourse) {
        this.courseService.updateCourse(this.currentCourse.id, this.addCourseForm.value).subscribe({
          next: () => {

            this.dialogRef.close(true);

          },
          error: (err) => console.error(err)
        });
      } else {
        this.courseService.addCourse(this.addCourseForm.value).subscribe({
          next: () => {

            this.dialogRef.close(true);

          },
          error: (err) => console.error(err)
        });
      }
    }
  }


}
