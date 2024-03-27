package com.empleadosManager.empleados.exception;

public class UserNotFoundException extends RuntimeException{
	public UserNotFoundException (String s) {
		super(s);
	}
}
