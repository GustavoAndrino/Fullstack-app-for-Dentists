package com.Fullstack_Dentist.backend.model;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "medicalProcedure")
public class Procedure {
	@Id
	@GeneratedValue
	private Long id;
	private String procedureName;
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime date;
	private Double value;
	private String clientName;


	@ManyToOne
	@JoinColumn(name = "client_id")
	private Client client;
	
	public Procedure() {
		
	}
	
	public Procedure(String procedureName, LocalDateTime date, Double value) {
		super();
		this.procedureName = procedureName;
		this.date = date;
		this.value = value;
	}
	
	public String getProcedure() {
		return procedureName;
	}
	public void setProcedure(String procedure) {
		this.procedureName = procedure;
	}
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public Double getValue() {
		return value;
	}
	public void setValue(Double value) {
		this.value = value;
	}

	public void setClient(Client newClient) {
		this.client = newClient;
		this.clientName = client != null ? client.getName() : null;
	}
	
	public String getClientName() {
		return clientName;
	}
}
