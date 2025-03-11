import { Routes } from '@angular/router';
import { CourseDetailesComponent } from '../components/course-detailes/course-detailes.component';
import { CourseComponent } from '../components/course/course.component';
import { CourseFormComponent } from '../components/course-form/course-form.component';
import { LessonFormComponent } from '../components/lesson-form/lesson-form.component';
import { LessonDetailesComponent } from '../components/lesson-detailes/lesson-detailes.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { EnteranceComponent } from '../components/enterance/enterance.component';
import { LessonComponent } from '../components/lesson/lesson.component';

export const routes: Routes = [
    { path: '', component: EnteranceComponent },
    { path: 'login', component: SignInComponent },
    { path: 'register', component: SignUpComponent },
    { path: 'courses/add', component: CourseFormComponent},
    { path: 'courses/edit/:id', component: CourseFormComponent},
    { path: 'add', component: LessonFormComponent },
    { path: 'edit/:lesson-id', component: LessonFormComponent, },
    { path: 'courses', component: CourseComponent,
        children: [           
            {
                path: ':id', component: CourseDetailesComponent, outlet:'course',
                children: [
                    { path: 'lessons/:lessonId', component: LessonDetailesComponent, outlet:'lesson'}
                    
                ]
            }
        ]
    }
];
