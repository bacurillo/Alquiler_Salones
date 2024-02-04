/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.ImagenReserva;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author LaptopSA
 */
public interface ImagenRepository extends JpaRepository<ImagenReserva, Long>{
    
}
