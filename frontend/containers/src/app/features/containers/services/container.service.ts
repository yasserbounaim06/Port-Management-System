import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Container as Container} from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class ContainerService {
    getUsers(): Observable<Container[]> {
      throw new Error('Method not implemented.');
    }
    private apiUrl = 'https://port-management-system.onrender.com/api';
    constructor(private http: HttpClient) {}

    getContainers(): Observable<Container[]> {
        return this.http.get<Container[]>(this.apiUrl+'/containers');}

    createContainers(user: Container): Observable<Container> {
        return this.http.post<Container>(this.apiUrl+'/containers', user);
    }

    getContainerById(id: string): Observable<Container> {
        return this.http.get<Container>(`${this.apiUrl}/containers/${id}`);}

    updateContainers(id: string, user: Container): Observable<Container> {
        return this.http.put<Container>(`${this.apiUrl}/containers/${id}`, user);
    }

    deleteContainers(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/containers/${id}`);
    }
}

