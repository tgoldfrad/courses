import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/lesson';
import { AsyncPipe } from '@angular/common';
import { LessonDetailesComponent } from "../lesson-detailes/lesson-detailes.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [AsyncPipe, LessonDetailesComponent, RouterOutlet, RouterLinkActive, RouterLink,LessonFormComponent,MatCardModule,MatListModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})


export class LessonComponent implements OnInit, OnChanges {

  isTeacher: boolean = sessionStorage.getItem("role") == "teacher" ? true : false;
  lessons$!: Observable<Lesson[]>;
  lessonToEdit!: Lesson;
  dialogRef:any;
  @Input() idCourse!:number; 

  constructor(private lessonService: LessonService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.lessons$ = this.lessonService.getLessons(this.idCourse);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idCourse']) {
      
      this.lessons$ = this.lessonService.getLessons(this.idCourse);
    }
  }

  deleteLesson(id: number): void {
    this.lessonService.deleteLesson(this.idCourse, id).subscribe(data=>{
      this.lessonService.getLessons(this.idCourse);})
  }

  showForm() {
      this.dialogRef = this.dialog.open(LessonFormComponent, {
        width: '330px',
        height: 'auto',
        panelClass: 'centered-dialog',
        data: { lesson: undefined } 
      });
    }
    editLesson(lesson: Lesson) {


      this.lessonToEdit = lesson;
      this.dialogRef = this.dialog.open(LessonFormComponent, {
        width: '330px',
        height: 'auto',
        panelClass: 'centered-dialog', 
        data: { lesson: this.lessonToEdit }
      });
      }
}
