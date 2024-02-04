/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.Reserva;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    @Query("SELECT r.resFechaEvento, r.reCotiId.cotiTipoEvento, r.resEstado, r.reCotiId.cotiMonto, r.reCotiId.salId.salNombre FROM Reserva r WHERE r.reCotiId.usuId.usuId = :userId")
    List<Object[]> findCustomReservasByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT COUNT(*) "
            + "FROM reserva "
            + "WHERE DAY(res_fecha_evento) = :dia "
            + "  AND MONTH(res_fecha_evento) = :mes "
            + "  AND YEAR(res_fecha_evento) = :anio", nativeQuery = true)
    int fechaOcupada(@Param("dia") int dia, @Param("mes") int mes, @Param("anio") int anio);

    @Query(value = "SELECT * FROM reserva WHERE res_estado= :est", nativeQuery = true)
    List<Reserva> listarEst(@Param("est") int est);

    @Query(value = "SELECT r.* FROM reserva r JOIN cotizacion c ON (r.re_coti_id=c.coti_id) WHERE c.usu_id= :id AND r.res_estado= :est", nativeQuery = true)
    List<Reserva> misReservas(@Param("id") int id, @Param("est") int est);

    @Query(value = "SELECT *  "
            + "FROM reserva  "
            + "WHERE DATE(res_fecha_registro)>= :ini  "
            + "AND DATE(res_fecha_registro) <= :fin "
            + "AND res_estado= :est", nativeQuery = true)
    List<Reserva> reservaFechas(@Param("ini") String ini, @Param("fin") String fin, @Param("est") int est);

    @Query(value = "SELECT (COUNT(*)+1) FROM reserva", nativeQuery = true)
    int numReserva();
}
