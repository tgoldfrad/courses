import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { LessonComponent } from '../lesson/lesson.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-course-detailes',
  standalone: true,
  imports: [LessonComponent,RouterOutlet,MatCardModule],
  templateUrl: './course-detailes.component.html',
  styleUrl: './course-detailes.component.css'
})
export class CourseDetailesComponent implements OnInit {
  course: Course|undefined;
  courseId!:number;
  constructor(private route: ActivatedRoute, private courseService: CourseService,private router: Router) {}

  ngOnInit(): void {
console.log("Loading Course Detail");

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.courseId = +id;
        this.courseService.getCourseById(this.courseId).subscribe((data) => {this.course = data});
      } else {
        console.error('course ID not found');
      }
    });

  }
}
