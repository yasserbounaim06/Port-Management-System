import { Injectable } from '@angular/core';
import { Container as Arret } from '../../containers/models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArretService {
    getUsers(): Observable<"Arret"[]> {
      throw new Error('Method not implemented.');
    }
    private apiUrl = 'https://port-management-system.onrender.com/api';
    constructor(private http: HttpClient) {}

    getArret(): Observable<Arret[]> {
        return this.http.get<Arret[]>(this.apiUrl+'/arrets');}

    createArret(user: Arret): Observable<Arret> {
        return this.http.post<Arret>(this.apiUrl+'/arrets', user);
    }

    getArretById(id: string): Observable<Arret> {
        return this.http.get<Arret>(`${this.apiUrl}/arrets/${id}`);}

    updateArret(id: string, user: Arret): Observable<Arret> {
        return this.http.put<Arret>(`${this.apiUrl}/arrets/${id}`, user);
    }

    deleteArret(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/arrets/${id}`);
    }
}
