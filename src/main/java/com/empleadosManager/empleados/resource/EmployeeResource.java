package com.empleadosManager.empleados.resource;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empleadosManager.empleados.model.Employee;
import com.empleadosManager.empleados.service.EmployeeService;



@RestController
@RequestMapping("/employee")
public class EmployeeResource {
	private final EmployeeService employeeService ;
	
	public EmployeeResource(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}
	
	@GetMapping ("/all")
	public ResponseEntity<List<Employee>> getAllEmployees(){
		List<Employee> employees = employeeService.findAllEmployee();
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}

	
	@GetMapping("/find/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id){
		Employee employees = employeeService.findEmployeeById(id);
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee){
		Employee newEmployees = employeeService.addEmployee(employee);
		return new ResponseEntity<>(newEmployees, HttpStatus.CREATED);
	}
	
	@PutMapping("/update")
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee){
		Employee updateEmployees = employeeService.addEmployee(employee);
		return new ResponseEntity<>(updateEmployees, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable("id") Long id){
		employeeService.deleteEmployee(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
	
}
