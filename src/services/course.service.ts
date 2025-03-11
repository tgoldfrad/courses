import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private coursesSubject:BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {

  }

  
    public loadCourses(): Observable<Course[]> {
      this.http.get<Course[]>(this.apiUrl).subscribe(courses => {
        this.coursesSubject.next(courses);
      });
      return this.courses$;
    }
  
  // קבלת כל הקורסים
  getAllCourses(): Observable<Course[]> {
    return this.courses$;
  }

 
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  
  addCourse(course: Partial<Course>): Observable<any> {
    return this.http.post(this.apiUrl, course).pipe(
      tap(() => this.loadCourses()) 
    );
  }

  updateCourse(id: number, course: Partial<Course>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course).pipe(
      tap(() => this.loadCourses()) 
    );
  }

  
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadCourses()) 
    );
  }


 
  enrollStudent(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId })


  }

  unenrollStudent( courseId: number,userId: number):Observable<any> {
   return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: {userId} })

  }
  getCoursesByUserId(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/student/${userId}`)
   
  }
  
}


