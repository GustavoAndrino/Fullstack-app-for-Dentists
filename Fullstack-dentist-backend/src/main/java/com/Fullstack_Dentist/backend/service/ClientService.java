package com.Fullstack_Dentist.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.Fullstack_Dentist.backend.exception.ClientNotFoundException;
import com.Fullstack_Dentist.backend.model.Client;
import com.Fullstack_Dentist.backend.model.Procedure;
import com.Fullstack_Dentist.backend.repository.ClientRepository;

@Service
public class ClientService {

	@Autowired
	ClientRepository clientRepository;
	
	public ResponseEntity<?> newClient(Client newClient){
		 Optional<Client> user = clientRepository.findByEmail(newClient.getEmail());
		    if (user.isPresent()) {
		        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
		    }
		    newClient.getProcedures().forEach(procedure -> procedure.setClient(newClient));
		    Client savedClient = clientRepository.save(newClient);
		    return ResponseEntity.status(HttpStatus.CREATED).body(savedClient);
	}
	
	public List<Client> allClients(Sort sort)	{
		return clientRepository.findAll(sort);
	}
	
	public ResponseEntity<?> clientId(Long id){
		Optional<Client> user = clientRepository.findById(id);
		
		 if (!user.isPresent()) {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		    }
		    return ResponseEntity.status(HttpStatus.FOUND).body(user);
	}
	
	public Client addNewProcedureToClient(Long id, Procedure procedure) {
		Client client =  clientRepository.findById(id).orElseThrow(() -> new ClientNotFoundException(id));
		procedure.setClient(client);
		client.addProcedure(procedure);
		return clientRepository.save(client);		
	}
	
	public List<Client> clientByName(Sort sort, String name){
		return clientRepository.findByName(name, sort);
	}
}
