import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: string;
  nombre: string;
  apellido: string;
  documento: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoloseService {

  private apiUrl = 'http://localhost:3000/userss';

  constructor(private http: HttpClient) { }

  get_nose(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  post_nose(user:User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  updateUser(usuario: User): Observable<User> {
    const url = `${this.apiUrl}/${usuario.id}`; // Asumiendo que tu API usa el ID en la URL
    return this.http.patch<User>(url, usuario);
  }
  
  
}

