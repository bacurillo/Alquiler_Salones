/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.ProductoServicio;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface ProductoServicioRepository extends JpaRepository<ProductoServicio, Integer> {

    @Query(value = "SELECT p.* "
            + "FROM producto_servicio p "
            + "JOIN tipo t ON p.tip_id= t.tip_id "
            + "JOIN categoria c ON c.cat_id= p.cat_id "
            + "WHERE p.prod_estado = :est "
            + "AND (LOWER(p.prod_nombre) LIKE CONCAT('%', :busqueda, '%') "
            + "     OR LOWER(p.prod_descripcion) LIKE CONCAT('%', :busqueda, '%') "
            + "     OR LOWER(c.cat_nombre) LIKE CONCAT('%', :busqueda, '%') "
            + "     OR LOWER(t.tip_nombre) LIKE CONCAT('%', :busqueda, '%') "
            + ")", nativeQuery = true)
    List<ProductoServicio> busquedaPS(@Param("busqueda") String busqueda, @Param("est") int est);

    @Query(value = "SELECT p.* FROM producto_servicio p WHERE p.prod_estado= :est", nativeQuery = true)
    List<ProductoServicio> listarPS(@Param("est") int est);

}
