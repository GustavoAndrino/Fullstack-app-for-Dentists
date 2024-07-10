package com.Fullstack_Dentist.backend.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;

@Entity
public class Client {
	
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String email;
	
	@OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("date DESC")
	private List<Procedure> procedures;
	
	public Client() {

	}
	
	public Client(Long id, String name, String email, List<Procedure> procedures) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.procedures = procedures;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Procedure> getProcedures() {
		return procedures;
	}

	public void setProcedures(List<Procedure> procedures) {
		this.procedures = procedures;
	}
	
	public void addProcedure(Procedure procedures) {
		this.procedures.add(procedures);
		
	}
	
	
	
	
	
}
