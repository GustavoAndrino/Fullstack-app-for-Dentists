package com.Fullstack_Dentist.backend.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.Fullstack_Dentist.backend.model.Procedure;


public interface ProcedureRepository extends JpaRepository<Procedure, Long> {
	Optional<Procedure> findByProcedureName(String procedureName);
	
	Optional<Procedure> findByClient_id(Long id);
	
	List<Procedure> findByClientId(Long clientId);
	
	List<Procedure> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
