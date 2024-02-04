/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Rol;
import com.m5a.salon.service.RolServiceImpl;
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
@RequestMapping("/rol")
public class RolController {

    @Autowired
    public RolServiceImpl rolService;

    @GetMapping("/listar")
    public ResponseEntity<List<Rol>> listarRoles() {
        return new ResponseEntity<>(rolService.findByAll(), HttpStatus.OK);
    }

    @GetMapping("/rolId/{id}")
    public ResponseEntity<Rol> prueba(@PathVariable int id) {
        Rol usuarioEncontrado = new Rol();
        return new ResponseEntity<>(rolService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Rol> crearRol(@RequestBody Rol r) {
        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        r.setRolFechaRegistro(fecha);
        return new ResponseEntity<>(rolService.save(r), HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Rol> actualizarRol(@PathVariable Integer id, @RequestBody Rol r) {
        Rol rol = rolService.findById(id);
        if (rol != null) {
            try {
                rol.setRolId(r.getRolId());
                rol.setRolNombre(r.getRolNombre());
                rol.setRolFechaRegistro(r.getRolFechaRegistro());
                return new ResponseEntity<>(rolService.save(rol), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Rol> elimiarRol(@PathVariable Integer id) {
        rolService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
