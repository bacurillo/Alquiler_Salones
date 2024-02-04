/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.Cotizacion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface CotizacionRepository extends JpaRepository<Cotizacion, Integer> {

    @Query("SELECT c.cotiId AS cotiId, c.salId.salNombre AS salonNombre, c.cotiMonto AS monto, c.cotiFechaEvento AS fechaReserva "
            + "FROM Cotizacion c "
            + "WHERE c.usuId.usuId = :usuarioId")
    List<Object[]> findCotizacionesByUsuarioId(@Param("usuarioId") Long usuarioId);

    @Query(value = "SELECT * FROM cotizacion WHERE usu_id = :id ORDER BY coti_fecha_evento ASC", nativeQuery = true)
    List<Cotizacion> misCotizacion(@Param("id") int id);

    @Query(value = "SELECT COUNT(*) FROM reserva WHERE re_coti_id = :cot", nativeQuery = true)
    int cotizacionReservada(@Param("cot") int usuario);
}
