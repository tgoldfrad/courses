import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatDialogModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent {

  currentLesson!:Lesson;  
  addLessonForm!: FormGroup;
  lessonId?: number;

  constructor(private lessonService: LessonService,private fb: FormBuilder,private route: ActivatedRoute,
    private router: Router,private dialogRef: MatDialogRef<LessonFormComponent>,private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: { lesson: Lesson }) { }

  ngOnInit(): void {
    this.currentLesson = this.data.lesson;
    this.addLessonForm = this.fb.group({
       title:[this.currentLesson?.title||'',Validators.required],
       content:[this.currentLesson?.content||'',Validators.required],
       courseId: [this.currentLesson?.courseId||'', Validators.required]

    })

  }
  onSubmit(): void {
    if(this.addLessonForm.valid)
      {

      if (this.currentLesson) {
      this.lessonService.updateLesson(this.currentLesson.courseId, this.currentLesson.id, this.addLessonForm.value).subscribe({
        next: () => {
          this.router.navigate(['/courses']),
          this.dialogRef.close(true);

        },
        error: (err) => console.error(err)
      });
    } else {
      this.lessonService.addLesson(this.addLessonForm.value.courseId, this.addLessonForm.value).subscribe({
        next: () => {
          this.router.navigate(['/courses']),
          this.dialogRef.close(true);

        },
        error: (err) => console.error(err)
      });
    }
  }
  }

}
