import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { MatCardModule } from '@angular/material/card';
import { filter } from 'rxjs';

@Component({
  selector: 'app-lesson-detailes',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './lesson-detailes.component.html',
  styleUrl: './lesson-detailes.component.css'
})
export class LessonDetailesComponent implements OnInit {
  lesson: Lesson|undefined;
  lessonId!:number;
  courseId!:number;
  cId:string|undefined;
  lId:string|undefined;

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private router: Router) {}

  ngOnInit(): void {

console.log("Loading lesson Detail");
this.route.parent?.params.subscribe(params => {
  this.cId = params['id'];
});

this.route.params.subscribe(params => {
  this.lId = params['lessonId'];
});

if(this.cId&&this.lId) {
  this.courseId = +this.cId;
  this.lessonId = +this.lId;
  this.lessonService.getLessonById(this.courseId,this.lessonId).subscribe((data) => {this.lesson = data});
}else {
  console.error('course or lesson ID not found');
}

this.router.events
.pipe(filter(event => event instanceof NavigationEnd))
.subscribe((event: NavigationEnd) => {
  console.log('URL changed to: ', event.url);
  this.handleUrlChange(event.url);
});
  }
  handleUrlChange(newUrl: string) {

    this.ngOnInit();
    console.log('Doing something with the new URL: ', newUrl);
  }
}


