/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.genericService;

import java.io.Serializable;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author LaptopSA
 * @param <T>
 * @param <ID>
 */
public interface GenericService<T, ID extends Serializable> {

    @Transactional
    public T save(T entity);

    @Transactional(readOnly = true)
    public T findById(ID id);

    @Transactional(readOnly = true)
    public List<T> findByAll();

    @Transactional
    public void delete(ID id);
}
