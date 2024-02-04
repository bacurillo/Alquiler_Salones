/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.Empresa;
import com.m5a.salon.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class EmpresaServiceImpl extends GenericServiceImpl<Empresa, Integer> implements GenericService<Empresa, Integer> {

    @Autowired
    public EmpresaRepository empresaRepository;

    @Override
    public CrudRepository<Empresa, Integer> getDao() {
        return empresaRepository;
    }

    public Empresa buscarEmpresaPorId(int empId) {
        return empresaRepository.buscarEmpresaPorId(empId);
    }
}
