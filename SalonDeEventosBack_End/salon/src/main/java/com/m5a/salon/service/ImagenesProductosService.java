/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.ImgProducto;
import com.m5a.salon.repository.ImgProductosRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class ImagenesProductosService extends GenericServiceImpl<ImgProducto, Integer> implements GenericService<ImgProducto, Integer> {

    @Autowired
    public ImgProductosRepository imgProductosRepository;

    @Override
    public CrudRepository<ImgProducto, Integer> getDao() {
        return imgProductosRepository;
    }

    public List<ImgProducto> imgProdId(int prod) {
        return imgProductosRepository.imgProdId(prod);
    }

    public List<ImgProducto> imgProdEst(int est) {
        return imgProductosRepository.imgProdEst(est);
    }
}
