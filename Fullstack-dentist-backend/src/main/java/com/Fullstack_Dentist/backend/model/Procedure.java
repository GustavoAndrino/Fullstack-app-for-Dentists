package com.Fullstack_Dentist.backend.model;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity(name = "medicalProcedure")
public class Procedure {
	@Id
	@GeneratedValue
	private Long id;
	private String procedureName;
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime date;
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime endDate;
	private Double value;
	
	@Column(columnDefinition = "MEDIUMTEXT")
	private String info;
	
	private String clientName;


	@ManyToOne
	@JoinColumn(name = "client_id")
	private Client client;
	
	public Procedure() {
		
	}
	
	public Procedure(String procedureName, LocalDateTime date, LocalDateTime endDate, Double value, String info) {
		super();
		this.procedureName = procedureName;
		this.date = date;
		this.endDate = endDate;
		this.value = value;
		this.info = info;
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

	public Long getId() {
		return id;
	}

	public LocalDateTime getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
	
	
	
}
