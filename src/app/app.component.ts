import { Component, OnInit, enableProdMode } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    public employees: Employee[] = [];
    public editEmployee: Employee ;
    public deleteEmployee: Employee;

    constructor(private employeeService: EmployeeService){
      this.editEmployee = {
        id: 0,
        name: "",
        email: "",
        jobTitle: "",
        phone:  "",
        imageUrl:  "",
        employeeCode:  ""};
      this.deleteEmployee = { id: 0,
        name: "",
        email: "",
        jobTitle: "",
        phone:  "",
        imageUrl:  "",
        employeeCode:  ""};
    }

    ngOnInit() {
      this.getEmployees();
    }

    public getEmployees(): void{
      this.employeeService.getEmployee().subscribe(
        (response: Employee[]) => {
          this.employees = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    public onAddEmloyee(addForm: NgForm): void{
      document.getElementById('add-employee-form')?.click();
        this.employeeService.addEmployee(addForm.value).subscribe(
          (response: Employee) =>{
            console.log(response);
            this.getEmployees();
            addForm.reset();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message);
          }
        );
    }
    public onUpdateEmloyee(employee: Employee): void{
        this.employeeService.addEmployee(employee).subscribe(
          (response: Employee) =>{
            console.log(response);
            this.getEmployees();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message);
          }
        );
    }

    public onDeleteEmloyee(employeeID: number): void{
        this.employeeService.deleteEmployee(employeeID).subscribe(
          (response: void) =>{
            console.log(response);
            this.getEmployees();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message);
          }
        );
    }

    public searchEmployees(key: string):void{
      const results: Employee[] = [];
      for(const employee of this.employees){
        if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
          results.push(employee);
        }
      }
      this.employees = results;
      if(results.length === 0 || !key){
        this.getEmployees();
      }
    }

    public onOpenModal( mode: string,employee?: Employee): void{
      const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if(mode ==='add'){
          button.setAttribute('data-target', '#addEmployeeModal');
        }
        if(mode ==='edit'){ 
          if(employee != null) {
            this.editEmployee = employee
          } 
          button.setAttribute('data-target', '#updateEmployeeModal');
        }
        if(mode ==='delete'){
          if(employee != null) {
            this.deleteEmployee = employee
          }
          button.setAttribute('data-target', '#deleteEmployeeModal');
        }
        container?.appendChild(button);
        button.click();

    }
}
