import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Engin } from "../models/engins.model";

@Injectable({
    providedIn: "root"
})
export class EnginsService {
    private apiUrl = 'http://127.0.0.1:5000/api';
    
    constructor(private http: HttpClient) {}

    getEngins(): Observable<Engin[]> {
        return this.http.get<Engin[]>(`${this.apiUrl}/engins`);
    }

    createEngin(engin: Engin): Observable<Engin> {
        return this.http.post<Engin>(`${this.apiUrl}/engins`, engin);
    }

    getEnginById(matricule: number): Observable<Engin> {
        return this.http.get<Engin>(`${this.apiUrl}/engins/${matricule}`);
    }

    updateEngin(matricule: number, engin: Engin): Observable<Engin> {
        return this.http.put<Engin>(`${this.apiUrl}/engins/${matricule}`, engin);
    }

    deleteEngin(matricule: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/engins/${matricule}`);
    }
}
