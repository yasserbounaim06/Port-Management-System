import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Personnel } from "../models/personnel.model";

@Injectable({
    providedIn: "root"
})
export class PersonnelService {
    private apiUrl = 'https://port-management-system.onrender.com/api';
    
    constructor(private http: HttpClient) {}

    getPersonnel(): Observable<Personnel[]> {
        return this.http.get<Personnel[]>(`${this.apiUrl}/personnel`);
    }

    createPersonnel(personnel: Personnel): Observable<Personnel> {
        return this.http.post<Personnel>(`${this.apiUrl}/personnel`, personnel);
    }

    getPersonnelById(id: number): Observable<Personnel> {
        return this.http.get<Personnel>(`${this.apiUrl}/personnel/${id}`);
    }

    updatePersonnel(id: number, personnel: Personnel): Observable<Personnel> {
        return this.http.put<Personnel>(`${this.apiUrl}/personnel/${id}`, personnel);
    }

    deletePersonnel(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/personnel/${id}`);
    }

    searchPersonnel(query: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/personnel/search?nom=${query}`);
    }
}
