/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.ImgProducto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface ImgProductosRepository extends JpaRepository<ImgProducto, Integer> {

    @Query(value = "SELECT i.* "
            + "FROM imagenes_productos i "
            + "JOIN producto_servicio p ON i.prod_id = p.prod_id "
            + "WHERE p.prod_id= :prod", nativeQuery = true)
    List<ImgProducto> imgProdId(@Param("prod") int prod);

    @Query(value = "SELECT i.* "
            + "FROM imagenes_productos i "
            + "JOIN producto_servicio p ON i.prod_id = p.prod_id "
            + "WHERE  p.prod_estado= :est", nativeQuery = true)
    List<ImgProducto> imgProdEst(@Param("est") int est);
}
