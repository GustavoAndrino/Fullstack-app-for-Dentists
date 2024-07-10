package com.Fullstack_Dentist.backend.exception;

public class ClientNotFoundException extends RuntimeException{
	public ClientNotFoundException(Long id) {
		super("Client not found. Id: " + id);
	}
}
