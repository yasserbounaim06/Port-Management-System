import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Shift } from "../models/shifts.model";

@Injectable({
    providedIn: "root"
})
export class ShiftsService {
    private apiUrl = 'http://127.0.0.1:5000/api';
    
    constructor(private http: HttpClient) {}

    getShifts(): Observable<Shift[]> {
        return this.http.get<Shift[]>(`${this.apiUrl}/shifts`);
    }

    createShift(shift: Shift): Observable<Shift> {
        return this.http.post<Shift>(`${this.apiUrl}/shifts`, shift);
    }

    getShiftById(id: number): Observable<Shift> {
        return this.http.get<Shift>(`${this.apiUrl}/shifts/${id}`);
    }

    updateShift(id: number, shift: Shift): Observable<Shift> {
        return this.http.put<Shift>(`${this.apiUrl}/shifts/${id}`, shift);
    }

    deleteShift(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/shifts/${id}`);
    }
}
