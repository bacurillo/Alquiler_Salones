/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {

    @Query(value = "SELECT * FROM empresa WHERE emp_id = :empId", nativeQuery = true)
    Empresa buscarEmpresaPorId(@Param("empId") int empId);

}
