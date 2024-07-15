package com.Fullstack_Dentist.backend.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.startup.ClassLoaderFactory.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Fullstack_Dentist.backend.model.Client;
import com.Fullstack_Dentist.backend.model.Procedure;
import com.Fullstack_Dentist.backend.repository.ClientRepository;
import com.Fullstack_Dentist.backend.repository.ProcedureRepository;

@Service
public class ProcedureService {
	
	@Autowired
	ProcedureRepository procedureRepository;
	
	public List<Procedure> allProcedures(){
		return procedureRepository.findAll();
	}
	
	public Optional<Procedure> procedureByName(String procedureName){
		return procedureRepository.findByProcedureName(procedureName);
	}
	
	  public List<Procedure> findProceduresByClientId(Long clientId) {
	        return procedureRepository.findByClientId(clientId);
	    }
	  
	  public List<Procedure> findProcedureByWeek(LocalDateTime date){
		  LocalDateTime inicioSemana = date.minusDays(date.getDayOfWeek().getValue()-1);
		  LocalDateTime fimSemana = inicioSemana.plusDays(6); 
	       
	       return procedureRepository.findByDateBetween(inicioSemana, fimSemana);
	  }
	  
	  public Procedure findProceduresByIdAndDate(LocalDateTime date, Long id){
		  List<Procedure> clientProcedures = procedureRepository.findByClientId(id);
		  Optional<Procedure> optionalProcedure = clientProcedures.stream()
		            .filter(procedure -> procedure.getDate().equals(date))
		            .findFirst();

		    // Return the found procedure if present, otherwise return null
		    return optionalProcedure.orElse(null);
	  }

}
