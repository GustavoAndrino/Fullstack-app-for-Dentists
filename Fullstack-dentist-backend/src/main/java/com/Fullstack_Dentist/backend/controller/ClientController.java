package com.Fullstack_Dentist.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Fullstack_Dentist.backend.model.Client;
import com.Fullstack_Dentist.backend.model.Procedure;
import com.Fullstack_Dentist.backend.repository.ClientRepository;
import com.Fullstack_Dentist.backend.service.ClientService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {
	
	@Autowired
	private ClientService clientService;
	
	@PostMapping("/client")
public ResponseEntity<?> addNewClient(@RequestBody Client newClient){
		return clientService.newClient(newClient);
	} 
	
	@GetMapping("/client")
public List<Client> getAllClients(@RequestParam(required=false) String sortBy, @RequestParam(required=false) String direction, @RequestParam(required=false) String name){
		Sort sort = Sort.unsorted();
		if(sortBy != null) {
			sort = Sort.by(Sort.Direction.fromString(direction == null ? "ASC" : direction), sortBy);
		}
		
		if(!name.isEmpty()) {
			return clientService.clientByName(sort, name);
		}
		return clientService.allClients(sort);
	}
	
	@GetMapping("/client/{id}")
	public ResponseEntity<?> getClientById(@PathVariable Long id){
		return clientService.clientId(id);
	}
	
	@PutMapping("/client/procedures/{id}")
	public Client addNewProcedure (@PathVariable Long id, @RequestBody Procedure procedure) {
		return clientService.addNewProcedureToClient(id, procedure);
	}
}