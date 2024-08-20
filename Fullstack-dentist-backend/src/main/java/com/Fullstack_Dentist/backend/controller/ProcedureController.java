package com.Fullstack_Dentist.backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Fullstack_Dentist.backend.model.Procedure;
import com.Fullstack_Dentist.backend.service.ProcedureService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProcedureController {
	
	@Autowired
	ProcedureService procedureService;
	
	@GetMapping("/procedure")
	public List<Procedure> allProcedures(@RequestParam(required=false) String sortBy, @RequestParam(required=false) String direction){
		Sort sort = Sort.unsorted();
		if(sortBy != null) {
			sort = Sort.by(Sort.Direction.fromString(direction == null ? "ASC" : direction), sortBy);
		}
		return procedureService.allProcedures(sort);
	}
	
	@GetMapping("/procedure/name/{procedureName}")
	public Optional<Procedure> procedureByName(@PathVariable String procedureName){
		return procedureService.procedureByName(procedureName);
	}
	
	@GetMapping("/procedure/{clientId}")
    public List<Procedure> getProceduresByClientId(@PathVariable Long clientId) {
        return procedureService.findProceduresByClientId(clientId);
    }
	
	@GetMapping("/proceduresofweek")
    public List<Procedure> getProceduresByDate(@RequestParam("date") 
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm") LocalDateTime date) {
        return procedureService.findProcedureByWeek(date);
    }
	
	@GetMapping("/procedure/byId/{id}")
	public Procedure findProcedureById(@PathVariable Long id) {
		return procedureService.findProcedureById(id);
	}
	
	@DeleteMapping("/procedure/del/{id}")
	public String deleteProcedure(@PathVariable Long id) {
		return procedureService.deleteProcedureById(id);
	}
	
	@PutMapping("/procedure/update/{id}")
	public Procedure updateProcedureById(@RequestBody(required=true) Procedure procedure, @PathVariable Long id) {
		return procedureService.updateProcedure(procedure, id);
	}
}
