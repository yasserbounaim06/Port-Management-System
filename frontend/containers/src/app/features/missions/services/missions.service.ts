import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Mission } from "../models/missions.model";

@Injectable({
    providedIn: "root"
})
export class MissionsService {
    private apiUrl = 'http://127.0.0.1:5000/api';
    
    constructor(private http: HttpClient) {}

    getMissions(): Observable<Mission[]> {
        return this.http.get<Mission[]>(`${this.apiUrl}/missions`);
    }

    createMission(mission: Mission): Observable<Mission> {
        return this.http.post<Mission>(`${this.apiUrl}/missions`, mission);
    }

    getMissionById(id: number): Observable<Mission> {
        return this.http.get<Mission>(`${this.apiUrl}/missions/${id}`);
    }

    updateMission(id: number, mission: Mission): Observable<Mission> {
        return this.http.put<Mission>(`${this.apiUrl}/missions/${id}`, mission);
    }

    deleteMission(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/missions/${id}`);
    }
}
