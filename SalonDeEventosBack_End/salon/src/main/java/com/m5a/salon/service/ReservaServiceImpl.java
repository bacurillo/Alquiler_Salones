/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.Reserva;
import com.m5a.salon.repository.ReservaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class ReservaServiceImpl extends GenericServiceImpl<Reserva, Integer> implements GenericService<Reserva, Integer> {

    @Autowired
    public ReservaRepository reservaRepository;

    @Override
    public CrudRepository<Reserva, Integer> getDao() {
        return reservaRepository;
    }

    public List<Object[]> findCustomReservasByUserId(Long userId) {
        return reservaRepository.findCustomReservasByUserId(userId);
    }

    public boolean fechaOcupada(int dia, int mes, int anio) {

        int fechaOcu = reservaRepository.fechaOcupada(dia, mes, anio);
        if (fechaOcu > 0) {
            return true;
        } else {
            return false;
        }
    }
    
    public int numReserva(){
        return reservaRepository.numReserva();
    }

    public List<Reserva> listarEst(int est) {
        return reservaRepository.listarEst(est);
    }

    public List<Reserva> misReservas(int id, int est) {
        return reservaRepository.misReservas(id, est);
    }

    public List<Reserva> reservaFechas(String ini, String fin, int est) {
        return reservaRepository.reservaFechas(ini, fin, est);
    }

}
