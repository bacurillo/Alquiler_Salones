/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Salon;
import com.m5a.salon.service.SalonServiceImpl;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author LaptopSA
 */
@RestController
@RequestMapping("/salon")
public class SalonController {

    @Autowired
    public SalonServiceImpl service;

    @GetMapping("/listar")
    public ResponseEntity<List<Salon>> listarSalones() {
        return new ResponseEntity<>(service.findByAll(), HttpStatus.OK);
    }

    @GetMapping("/listar/{est}")
    public ResponseEntity<List<Salon>> listarEst(@PathVariable int est) {
        return new ResponseEntity<>(service.listarEstado(est), HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Salon> crearSalon(@RequestBody Salon s) {
        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        s.setSalFechaRegistro(fecha);
        return new ResponseEntity<>(service.save(s), HttpStatus.CREATED);
    }

    @GetMapping("/salonporid/{id}")
    public ResponseEntity<Salon> salonPorId(@PathVariable int id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/busqueda/{busqueda}/{est}")
    public ResponseEntity<List<Salon>> buscarSalon(@PathVariable String busqueda,@PathVariable int est) {
        return new ResponseEntity<>(service.buscarSal(busqueda,est), HttpStatus.OK);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Salon> actualizarSalon(@PathVariable Integer id, @RequestBody Salon s) {
        Salon salon = service.findById(id);
        if (salon != null) {
            try {
                salon.setSalCapacidad(s.getSalCapacidad());
                salon.setSalCostoHora(s.getSalCostoHora());
                salon.setSalDireccion(s.getSalDireccion());
                salon.setSalEstado(s.getSalEstado());
                salon.setListaCotizaciones(s.getListaCotizaciones());
                salon.setSalNombre(s.getSalNombre());
                salon.setSalFechaRegistro(s.getSalFechaRegistro());
                return new ResponseEntity<>(service.save(salon), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/actualizarEst/{id}/{estado}")
    public ResponseEntity<Salon> actualizarEstado(@PathVariable Integer id, @PathVariable Integer estado) {
        Salon salon = service.findById(id);
        if (salon != null) {
            try {

                salon.setSalEstado(estado);

                return new ResponseEntity<>(service.save(salon), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Salon> elimiarRol(@PathVariable Integer id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
