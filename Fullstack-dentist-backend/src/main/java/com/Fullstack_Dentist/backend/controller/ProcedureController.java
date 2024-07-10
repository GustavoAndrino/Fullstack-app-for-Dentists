package com.Fullstack_Dentist.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.Fullstack_Dentist.backend.model.Procedure;
import com.Fullstack_Dentist.backend.service.ProcedureService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProcedureController {
	
	@Autowired
	ProcedureService procedureService;
	
	@GetMapping("/procedure")
	public List<Procedure> allProcedures(){
		return procedureService.allProcedures();
	}
	
	@GetMapping("/procedure/name/{procedureName}")
	public Optional<Procedure> procedureByName(@PathVariable String procedureName){
		return procedureService.procedureByName(procedureName);
	}
	
	@GetMapping("/procedure/{clientId}")
    public List<Procedure> getProceduresByClientId(@PathVariable Long clientId) {
        return procedureService.findProceduresByClientId(clientId);
    }
}
