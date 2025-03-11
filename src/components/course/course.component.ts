import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseFormComponent } from '../course-form/course-form.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-course',
  standalone: true,
  imports: [AsyncPipe, FormsModule, RouterOutlet, RouterLinkActive, RouterLink,
    MatCardModule, MatListModule, MatDialogModule
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})

export class CourseComponent implements OnInit {
  joinedCourses: Course[] = [];
  courses$!: Observable<Course[]>;

  courseToEdit!: Course;
  isTeacher: boolean = sessionStorage.getItem("role") == "teacher" ? true : false;
  userId: string | null = sessionStorage.getItem("userId");
  private dialogRef: any;
  constructor(private courseService: CourseService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.loadCourses();


    if (this.userId != null) {
      this.courseService.getCoursesByUserId(+this.userId).subscribe(data => {
        this.joinedCourses = data;
      });
      this.courseService.loadCourses().subscribe();
    }

  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(data => {
      this.courseService.loadCourses();
    })

  }
  showForm(): void {
    this.dialogRef = this.dialog.open(CourseFormComponent, {
      width: '330px',
      height: 'auto',
      panelClass: 'centered-dialog',
      data: { course: undefined }
    });
  }

  editCourse(course: Course): void {
    this.courseToEdit = course;
    this.dialogRef = this.dialog.open(CourseFormComponent, {
      width: '330px',
      height: 'auto',
      panelClass: 'centered-dialog',
      data: { course: this.courseToEdit }
    });
  }
  isJoin(course: Course) {
    return this.joinedCourses.find(c => c.id === course.id) !== undefined;
  }

  joinCourse(course: Course) {
    this.courseService.enrollStudent(course.id, parseInt(this.userId ?? "")).subscribe(() => {
      this.courseService.getCoursesByUserId(parseInt(this.userId ?? "")).subscribe(d => {
        this.joinedCourses = d;
      });
      this.courses$ = this.courseService.loadCourses();
    })
  }

  leaveCourse(course: Course) {
    this.courseService.unenrollStudent(course.id, parseInt(this.userId ?? "")).subscribe(() => {
      this.courseService.getCoursesByUserId(parseInt(this.userId ?? "")).subscribe(d => {
        this.joinedCourses = d;
      });
      this.courses$ = this.courseService.loadCourses();
    });
  }


}
