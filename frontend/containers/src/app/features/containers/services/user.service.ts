import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Container as Arret} from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class ContainerService {
    getUsers(): Observable<Arret[]> {
      throw new Error('Method not implemented.');
    }
    private apiUrl = 'http://127.0.0.1:5000/api' ;
    constructor(private http: HttpClient) {}

    getContainers(): Observable<Arret[]> {
        return this.http.get<Arret[]>(this.apiUrl+'/containers');}

    createContainers(user: Arret): Observable<Arret> {
        return this.http.post<Arret>(this.apiUrl+'/containers', user);
    }

    getContainerById(id: string): Observable<Arret> {
        return this.http.get<Arret>(`${this.apiUrl}/containers/${id}`);}

    updateContainers(id: string, user: Arret): Observable<Arret> {
        return this.http.put<Arret>(`${this.apiUrl}/containers/${id}`, user);
    }

    deleteContainers(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/containers/${id}`);
    }
}

 
export class ArretService {
    getUsers(): Observable<Arret[]> {
      throw new Error('Method not implemented.');
    }
    private apiUrl = 'http://127.0.0.1:5000/api' ;
    constructor(private http: HttpClient) {}

    getContainers(): Observable<Arret[]> {
        return this.http.get<Arret[]>(this.apiUrl+'/arrets');}

    createContainers(user: Arret): Observable<Arret> {
        return this.http.post<Arret>(this.apiUrl+'/containers', user);
    }

    getContainerById(id: string): Observable<Arret> {
        return this.http.get<Arret>(`${this.apiUrl}/containers/${id}`);}

    updateContainers(id: string, user: Arret): Observable<Arret> {
        return this.http.put<Arret>(`${this.apiUrl}/containers/${id}`, user);
    }

    deleteContainers(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/containers/${id}`);
    }
}
