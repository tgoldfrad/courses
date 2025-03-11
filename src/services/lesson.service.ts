import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private lessonSubject:BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  lesson$ = this.lessonSubject.asObservable();
  private url = 'http://localhost:3000/api/courses';
  
  constructor(private http: HttpClient) {

  }

  getLessons(courseId: number) : Observable<Lesson[]>{
    this.http.get<Lesson[]>(`${this.url}/${courseId}/lessons`).subscribe((data) =>this.lessonSubject.next(data));
    return this.lesson$;
  }


  getLessonById(courseId: number, lessonId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.url}/${courseId}/lessons/${lessonId}`);
  }


  addLesson(courseId: number, lesson: Lesson): Observable<{ message: string; lessonId: number }> {
    return this.http.post<{ message: string; lessonId: number }>(`${this.url}/${courseId}/lessons`,lesson).pipe(
      tap(() => this.getLessons(courseId))
    );
  }
  updateLesson(courseId: number, lessonId: number, lesson: Lesson): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.url}/${courseId}/lessons/${lessonId}`,lesson).pipe(
      tap(() => this.getLessons(courseId))
    );
  }


  deleteLesson(courseId: number, lessonId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.url}/${courseId}/lessons/${lessonId}`).pipe(
      tap(() => this.getLessons(courseId))
    );
  }
}
