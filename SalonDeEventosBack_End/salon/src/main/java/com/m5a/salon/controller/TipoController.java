/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Tipo;
import com.m5a.salon.service.TipoServiceImpl;
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
@RequestMapping("/tipo")
public class TipoController {

    @Autowired
    public TipoServiceImpl tipoService;

    @GetMapping("/listar")
    public ResponseEntity<List<Tipo>> listarTipos() {
        return new ResponseEntity<>(tipoService.findByAll(), HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Tipo> crearTipos(@RequestBody Tipo t) {
        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        t.setTipFechaRegistro(fecha);
        return new ResponseEntity<>(tipoService.save(t), HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Tipo> actualizarTipos(@PathVariable Integer id, @RequestBody Tipo t) {
        Tipo tipo = tipoService.findById(id);
        if (tipo != null) {
            try {

                tipo.setTipId(t.getTipId());
                tipo.setTipNombre(t.getTipNombre());
                tipo.setTipFechaRegistro(t.getTipFechaRegistro());

                return new ResponseEntity<>(tipoService.save(tipo), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Tipo> elimiarTipos(@PathVariable Integer id) {
        tipoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
