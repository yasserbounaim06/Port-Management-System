import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Arret } from "../models/arrets.model";

@Injectable({
    providedIn: "root"
})
export class ArretsService {
    private apiUrl = 'https://port-management-system.onrender.com/api';
    
    constructor(private http: HttpClient) {}

    getArrets(): Observable<Arret[]> {
        return this.http.get<Arret[]>(`${this.apiUrl}/arrets`);
    }

    createArret(arret: Arret): Observable<Arret> {
        return this.http.post<Arret>(`${this.apiUrl}/arrets`, arret);
    }

    getArretById(id: number): Observable<Arret> {
        return this.http.get<Arret>(`${this.apiUrl}/arrets/${id}`);
    }

    updateArret(id: number, arret: Arret): Observable<Arret> {
        return this.http.put<Arret>(`${this.apiUrl}/arrets/${id}`, arret);
    }

    deleteArret(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/arrets/${id}`);
    }
}
