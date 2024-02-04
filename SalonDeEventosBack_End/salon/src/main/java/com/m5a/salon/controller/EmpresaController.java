/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Empresa;
import com.m5a.salon.service.EmpresaServiceImpl;
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
@RequestMapping("/empresa")
public class EmpresaController {

    @Autowired
    public EmpresaServiceImpl empresaService;

    @GetMapping("/listar")
    public ResponseEntity<List<Empresa>> listarEmpresas() {
        return new ResponseEntity<>(empresaService.findByAll(), HttpStatus.OK);
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<Empresa> getEmpresaPorId(@PathVariable Integer id) {
        return new ResponseEntity<>(empresaService.buscarEmpresaPorId(id), HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Empresa> crearEmpresa(@RequestBody Empresa e) {
        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        e.setEmpFechaRegistro(fecha);
        return new ResponseEntity<>(empresaService.save(e), HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Empresa> actualizarEmpresa(@PathVariable Integer id, @RequestBody Empresa e) {
        Empresa empresa = empresaService.findById(id);
        if (empresa != null) {
            try {

                empresa.setEmpId(e.getEmpId());
                empresa.setEmpFechaRegistro(e.getEmpFechaRegistro());
                empresa.setEmpNombre(e.getEmpNombre());
                empresa.setEmpTelefono(e.getEmpTelefono());

                return new ResponseEntity<>(empresaService.save(empresa), HttpStatus.CREATED);
            } catch (Exception ex) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Empresa> elimiarCotizaciones(@PathVariable Integer id) {
        empresaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
