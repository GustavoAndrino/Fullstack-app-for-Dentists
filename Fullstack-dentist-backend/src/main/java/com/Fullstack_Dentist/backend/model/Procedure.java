package com.Fullstack_Dentist.backend.model;

import java.sql.Date;
import java.time.LocalDate;

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
	@JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
	private Double value;
	
	@ManyToOne
	@JoinColumn(name = "client_id")
	private Client client;
	
	public Procedure() {
		
	}
	
	public Procedure(String procedureName, LocalDate date, Double value) {
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
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
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
	}
}
