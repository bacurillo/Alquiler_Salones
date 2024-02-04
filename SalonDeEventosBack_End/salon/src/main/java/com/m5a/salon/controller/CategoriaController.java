/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Categoria;
import com.m5a.salon.service.CategoriaServiceImpl;
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
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    public CategoriaServiceImpl categoriaService;

    @GetMapping("/listar")
    public ResponseEntity<List<Categoria>> listarCategoria() {
        return new ResponseEntity<>(categoriaService.findByAll(), HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria c) {
        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        c.setCatFechaRegistro(fecha);
        return new ResponseEntity<>(categoriaService.save(c), HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Integer id, @RequestBody Categoria c) {
        Categoria categoria = categoriaService.findById(id);
        if (categoria != null) {
            try {
                categoria.setCatId(c.getCatId());
                categoria.setCatNombre(c.getCatNombre());
                categoria.setCatFechaRegistro(c.getCatFechaRegistro());

                return new ResponseEntity<>(categoriaService.save(categoria), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Categoria> elimiarCategoria(@PathVariable Integer id) {
        categoriaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
