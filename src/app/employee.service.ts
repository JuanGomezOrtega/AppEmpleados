import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "./employee";
import { Injectable } from "@angular/core";
import { environmet } from "../environments/environment";
@Injectable({
    providedIn: 'root'
})
export class EmployeeService{
    private apiServerUrl = environmet.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getEmployee(): Observable<Employee[]>{
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    }

    public addEmployee(employee: Employee): Observable<Employee>{
        return this.http.post<any>(`${this.apiServerUrl}/employee/add`, employee);
    }
    public updateEmployee(employee: Employee): Observable<Employee>{
        return this.http.put<any>(`${this.apiServerUrl}/employee/update`, employee);
    }
    public deleteEmployee(employeeId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
    }
}