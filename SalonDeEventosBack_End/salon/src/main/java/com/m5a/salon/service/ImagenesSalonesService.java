/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.ImgSalon;
import com.m5a.salon.repository.ImgSalonRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class ImagenesSalonesService extends GenericServiceImpl<ImgSalon, Integer> implements GenericService<ImgSalon, Integer> {

    @Autowired
    public ImgSalonRepository imgSalonRepository;

    @Override
    public CrudRepository<ImgSalon, Integer> getDao() {
        return imgSalonRepository;
    }

    public List<String> findUrlsBySalonId(int salonId) {
        return imgSalonRepository.findUrlsBySalonId(salonId);
    }
}
