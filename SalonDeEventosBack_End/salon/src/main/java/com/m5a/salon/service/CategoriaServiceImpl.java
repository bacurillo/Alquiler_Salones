/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.Categoria;
import com.m5a.salon.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class CategoriaServiceImpl extends GenericServiceImpl<Categoria, Integer> implements GenericService<Categoria, Integer> {

    @Autowired
    public CategoriaRepository categoriaRepository;

    @Override
    public CrudRepository<Categoria, Integer> getDao() {
        return categoriaRepository;
    }
}
