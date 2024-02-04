/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Adicionales;
import com.m5a.salon.service.AdicionalesServiceImpl;
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
@RequestMapping("/adicionales")
public class AdicionalesController {

    @Autowired
    public AdicionalesServiceImpl adicionalesService;

    @GetMapping("/listar")
    public ResponseEntity<List<Adicionales>> listarAdicionales() {
        return new ResponseEntity<>(adicionalesService.findByAll(), HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Adicionales> crearAdicionales(@RequestBody Adicionales a) {
        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        a.setAdiFechaRegistro(fecha);
        return new ResponseEntity<>(adicionalesService.save(a), HttpStatus.CREATED);
    }

    @GetMapping("/adicionalesCoti/{id}")
    public ResponseEntity<List<Adicionales>> adicionalesCoti(@PathVariable int id) {
        return new ResponseEntity<>(adicionalesService.adicionalesCoti(id), HttpStatus.OK);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Adicionales> actualizarAdicionales(@PathVariable Integer id, @RequestBody Adicionales a) {
        Adicionales adicionales = adicionalesService.findById(id);
        if (adicionales != null) {
            try {
                adicionales.setAdiId(a.getAdiId());
                adicionales.setProdId(a.getProdId());
                adicionales.setCotiId(a.getCotiId());
                adicionales.setAdiFechaRegistro(a.getAdiFechaRegistro());

                return new ResponseEntity<>(adicionalesService.save(adicionales), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Adicionales> elimiarAdicionales(@PathVariable Integer id) {
        adicionalesService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
