/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.Salon;
import com.m5a.salon.repository.SalonRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class SalonServiceImpl extends GenericServiceImpl<Salon, Integer> implements GenericService<Salon, Integer> {

    @Autowired
    public SalonRepository repository;

    @Override
    public CrudRepository<Salon, Integer> getDao() {
        return repository;
    }

    public Salon buscarPorId(int id) {
        return repository.buscarSalonPorID(id);
    }

    public List<Salon> buscarSal(String busqueda, int est) {
        return repository.buscarSal(busqueda, est);
    }

    public List<Salon> listarEstado(int est) {
        return repository.listarXestado(est);
    }
}
