import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Navire } from "../models/navires.model";

@Injectable({
    providedIn: "root"
})
export class NaviresService {
    private apiUrl = 'https://port-management-system.onrender.com/api';
    
    constructor(private http: HttpClient) {}

    getNavires(): Observable<Navire[]> {
        return this.http.get<Navire[]>(`${this.apiUrl}/navires`);
    }

    createNavire(navire: Navire): Observable<Navire> {
        return this.http.post<Navire>(`${this.apiUrl}/navires`, navire);
    }

    getNavireById(matricule: number): Observable<Navire> {
        return this.http.get<Navire>(`${this.apiUrl}/navires/${matricule}`);
    }

    updateNavire(matricule: number, navire: Navire): Observable<Navire> {
        return this.http.put<Navire>(`${this.apiUrl}/navires/${matricule}`, navire);
    }

    deleteNavire(matricule: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/navires/${matricule}`);
    }
}
