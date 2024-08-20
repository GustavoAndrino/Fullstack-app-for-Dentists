package com.Fullstack_Dentist.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.Fullstack_Dentist.backend.model.Client;


public interface ClientRepository extends JpaRepository<Client, Long>{
	Optional<Client> findByEmail(String email);
	
	@Query("SELECT c FROM Client c WHERE c.name LIKE :name%")
	List<Client> findByName(@Param("name")String name, Sort sort);
	
}
