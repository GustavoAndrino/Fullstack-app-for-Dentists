package com.Fullstack_Dentist.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.Fullstack_Dentist.backend.model.Procedure;


public interface ProcedureRepository extends JpaRepository<Procedure, Long> {
	Optional<Procedure> findByProcedureName(String procedureName);
	
	List<Procedure> findByClientId(Long clientId);
}
