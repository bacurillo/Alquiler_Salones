/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.Adicionales;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface AdicionalesRepository extends JpaRepository<Adicionales, Integer> {
    @Query(value = "SELECT * FROM adicionales WHERE coti_id= :id", nativeQuery = true)
    List<Adicionales> adicionalesCoti(@Param("id") int id);
}
