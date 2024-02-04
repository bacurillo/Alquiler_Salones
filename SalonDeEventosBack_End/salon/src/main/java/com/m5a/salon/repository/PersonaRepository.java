/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface PersonaRepository extends JpaRepository<Persona, Integer> {

    @Query(value = "select MAX(persona.per_id) from persona", nativeQuery = true)
    int ultimoRegistro();

    @Query(value = "SELECT COUNT(*) FROM persona WHERE per_cedula = :cedulaPersona", nativeQuery = true)
    int contarCedulas(@Param("cedulaPersona") String cedulaPersona);
}
