/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.Persona;
import com.m5a.salon.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class PersonaServiceImpl extends GenericServiceImpl<Persona, Integer> implements GenericService<Persona, Integer> {

    @Autowired
    public PersonaRepository personaRepository;

    @Override
    public CrudRepository<Persona, Integer> getDao() {
        return personaRepository;
    }

    public int ultimoRegistro() {
        return personaRepository.ultimoRegistro();
    }

    //valida cedula no repetida
    public boolean siExisteCedula(String cedula) {
        int cedulas = personaRepository.contarCedulas(cedula);
        if (cedulas > 0) {
            return false;
        } else {
            return true;
        }
    }
}
