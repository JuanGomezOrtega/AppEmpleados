package com.empleadosManager.empleados.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.empleadosManager.empleados.exception.UserNotFoundException;
import com.empleadosManager.empleados.model.Employee;
import com.empleadosManager.empleados.repo.EmployeeRepo;

@Service
public class EmployeeService {
	private final EmployeeRepo employeeRepo;
	public EmployeeService(EmployeeRepo employeeRepo) {
		this.employeeRepo = employeeRepo;
	}
	
	public Employee addEmployee(Employee employee) {
		employee.setEmployeeCode(UUID.randomUUID().toString());
		return employeeRepo.save(employee);
	}
	
	public List<Employee> findAllEmployee(){
		return employeeRepo.findAll();
	}
	
	public Employee updateEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}
	
	public Employee findEmployeeById(Long id) {
		return employeeRepo.findEmployeeById(id)
				.orElseThrow(() -> new UserNotFoundException("User by id " + id + "was not found"));
	} 
	
	public void deleteEmployee(Long id) {
		employeeRepo.deleteEmployeeById(id);
	}
	
	
	
}