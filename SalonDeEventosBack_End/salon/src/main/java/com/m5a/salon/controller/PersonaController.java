/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Persona;
import com.m5a.salon.model.entity.Usuario;
import com.m5a.salon.service.PersonaServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author LaptopSA
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/persona")
public class PersonaController {

    @Autowired
    public PersonaServiceImpl personaService;

    @GetMapping("/listar")
    public ResponseEntity<List<Persona>> listaUsuarios() {
        return new ResponseEntity<>(personaService.findByAll(), HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Persona> crearPersona(@RequestBody Persona p) {
//        boolean ban = personaService.siExisteCedula(p.getPerCedula());
//        if (ban) {
        return new ResponseEntity<>(personaService.save(p), HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
    }

    @GetMapping("/ultimoregistro")
    public ResponseEntity<Integer> ultimoRegistro() {
        return ResponseEntity.ok(personaService.ultimoRegistro());
    }

    @GetMapping("/cedulaRegistra/{cedula}")
    public ResponseEntity<Boolean> siExisteCedula(@PathVariable String cedula) {

        return ResponseEntity.ok(personaService.siExisteCedula(cedula));
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Persona> actualizarPersona(@PathVariable Integer id, @RequestBody Persona p) {
        Persona persona = personaService.findById(id);
        if (persona != null) {
            try {
                persona.setPerApellido(p.getPerApellido());
                persona.setPerCedula(p.getPerCedula());
                persona.setPerCorreo(p.getPerCorreo());
                persona.setPerDireccion(p.getPerDireccion());
                persona.setPerFechaNacimiento(p.getPerFechaNacimiento());
                persona.setPerNombre(p.getPerNombre());
                persona.setPerTelefono(p.getPerTelefono());
                return new ResponseEntity<>(personaService.save(persona), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Persona> elimiarPersona(@PathVariable Integer id) {
        personaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
