package com.Fullstack_Dentist.backend.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SemanaController {
	@GetMapping("/semana")
	public List<String> getSemana(){
		LocalDate hoje = LocalDate.now();
		 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM");
		LocalDate inicioSemana = hoje.minusDays(hoje.getDayOfWeek().getValue()-1);
		
		List<String> semana = new ArrayList<>();
		
		for(int i = 0; i < 7; i++) {
			semana.add(inicioSemana.plusDays(i).format(formatter));
		}
		
		return semana;
	}
}
