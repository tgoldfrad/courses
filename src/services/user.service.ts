import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:3000/api/auth'
  constructor(private http: HttpClient) { }
  signUp(name: string, email: string, password: string, role: string) {
    return this.http.post(`${this.url}/register`, {name, email, password, role})

  }
  
  signIn(email: string, password: string) {
    return this.http.post(`${this.url}/login`, {email, password})

  }
}
