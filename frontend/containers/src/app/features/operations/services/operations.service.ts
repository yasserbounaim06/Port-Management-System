import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Operation } from "../models/operations.model";

@Injectable({
    providedIn: "root"
})
export class OperationsService {
    private apiUrl = 'http://127.0.0.1:5000/api';
    
    constructor(private http: HttpClient) {}

    getOperations(): Observable<Operation[]> {
        return this.http.get<Operation[]>(`${this.apiUrl}/operations`);
    }

    createOperation(operation: Operation): Observable<Operation> {
        return this.http.post<Operation>(`${this.apiUrl}/operations`, operation);
    }

    getOperationById(id: number): Observable<Operation> {
        return this.http.get<Operation>(`${this.apiUrl}/operations/${id}`);
    }

    updateOperation(id: number, operation: Operation): Observable<Operation> {
        return this.http.put<Operation>(`${this.apiUrl}/operations/${id}`, operation);
    }

    deleteOperation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/operations/${id}`);
    }
}
