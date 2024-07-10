package com.Fullstack_Dentist.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.Fullstack_Dentist.backend.model.Client;


public interface ClientRepository extends JpaRepository<Client, Long>{
	Optional<Client> findByEmail(String email);
	
}
