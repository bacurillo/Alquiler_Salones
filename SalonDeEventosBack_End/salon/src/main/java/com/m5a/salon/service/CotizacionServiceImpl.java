/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.Cotizacion;
import com.m5a.salon.repository.CotizacionRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class CotizacionServiceImpl extends GenericServiceImpl<Cotizacion, Integer> implements GenericService<Cotizacion, Integer> {

    @Autowired
    public CotizacionRepository cotizacionRepository;

    @Override
    public CrudRepository<Cotizacion, Integer> getDao() {
        return cotizacionRepository;
    }

    public List<Map<String, Object>> findCotizacionesByUsuarioId(Long usuarioId) {
        List<Object[]> cotizaciones = cotizacionRepository.findCotizacionesByUsuarioId(usuarioId);

        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] cotizacion : cotizaciones) {
            Map<String, Object> cotizacionMap = new HashMap<>();
            cotizacionMap.put("cotiId", cotizacion[0]);
            cotizacionMap.put("salonNombre", cotizacion[1]);
            cotizacionMap.put("monto", cotizacion[2]);
            cotizacionMap.put("fechaReserva", cotizacion[3]);
            result.add(cotizacionMap);
        }

        return result;
    }

    public List<Cotizacion> misCotizacion(int id) {
        return cotizacionRepository.misCotizacion(id);
    }
    
    public boolean cotizacionReservada(int idCot) {

        int count = cotizacionRepository.cotizacionReservada(idCot);
        if (count > 0) {
            return false;
        } else {
            return true;
        }
    }
}
