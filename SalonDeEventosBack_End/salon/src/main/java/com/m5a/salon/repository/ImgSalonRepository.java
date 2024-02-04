/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.ImgSalon;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface ImgSalonRepository extends JpaRepository<ImgSalon, Integer> {

    @Query(value = "SELECT img.img_Sal_Url FROM Imagenes_Salones img WHERE img.sal_Id = :salonId", nativeQuery = true)
    List<String> findUrlsBySalonId(@Param("salonId") int salonId);
    
}
