import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Occupation } from "../models/occupations.model";

@Injectable({
    providedIn: "root"
})
export class OccupationsService {
    private apiUrl = 'http://127.0.0.1:5000/api';
    
    constructor(private http: HttpClient) {}

    getOccupations(): Observable<Occupation[]> {
        return this.http.get<Occupation[]>(`${this.apiUrl}/occupations`);
    }

    createOccupation(occupation: Occupation): Observable<Occupation> {
        return this.http.post<Occupation>(`${this.apiUrl}/occupations`, occupation);
    }

    getOccupationById(id: number): Observable<Occupation> {
        return this.http.get<Occupation>(`${this.apiUrl}/occupations/${id}`);
    }

    updateOccupation(id: number, occupation: Occupation): Observable<Occupation> {
        return this.http.put<Occupation>(`${this.apiUrl}/occupations/${id}`, occupation);
    }

    deleteOccupation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/occupations/${id}`);
    }
}
