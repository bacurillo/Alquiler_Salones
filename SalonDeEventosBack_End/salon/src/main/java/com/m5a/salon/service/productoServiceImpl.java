/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.ProductoServicio;
import com.m5a.salon.model.entity.Usuario;
import com.m5a.salon.repository.ProductoServicioRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class productoServiceImpl extends GenericServiceImpl<ProductoServicio, Integer> implements GenericService<ProductoServicio, Integer> {

    @Autowired
    public ProductoServicioRepository repository;

    @Override
    public CrudRepository<ProductoServicio, Integer> getDao() {
        return repository;
    }

    public List<ProductoServicio> busquedaPS(String busqueda, int est) {
        return repository.busquedaPS(busqueda, est);
    }

    public List<ProductoServicio> listarPS(int est) {
        return repository.listarPS(est);
    }
}
