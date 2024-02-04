/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.ProductoServicio;
import com.m5a.salon.service.productoServiceImpl;
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
@RequestMapping("/productoServicio")
public class productoController {

    @Autowired
    productoServiceImpl service;

    @GetMapping("/listar")
    public ResponseEntity<List<ProductoServicio>> listarProductos() {
        return new ResponseEntity<>(service.findByAll(), HttpStatus.OK);
    }

    @GetMapping("/listar/{est}")
    public ResponseEntity<List<ProductoServicio>> listarProductosEst(@PathVariable int est) {
        return new ResponseEntity<>(service.listarPS(est), HttpStatus.OK);
    }

    @GetMapping("/busqueda/{busqueda}/{est}")
    public ResponseEntity<List<ProductoServicio>> busquedaUsuarios(@PathVariable String busqueda, @PathVariable int est) {
        return new ResponseEntity<>(service.busquedaPS(busqueda, est), HttpStatus.OK);
    }

    @GetMapping("/buscar/{id}")
    public ProductoServicio buscarUsuId(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping("/crear")
    public ResponseEntity<ProductoServicio> crearProductos(@RequestBody ProductoServicio ps) {
        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        ps.setProdFechaRegistro(fecha);
        return new ResponseEntity<>(service.save(ps), HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ProductoServicio> actualizarProductos(@PathVariable Integer id, @RequestBody ProductoServicio ps) {
        ProductoServicio producto = service.findById(id);
        if (producto != null) {
            try {

                producto.setProdId(ps.getProdId());
                producto.setProdNombre(ps.getProdNombre());
                producto.setProdPrecio(ps.getProdPrecio());
                producto.setProdEstado(ps.getProdEstado());
                producto.setProdDescripcion(ps.getProdDescripcion());
                producto.setCatId(ps.getCatId());
                producto.setTipId(ps.getTipId());

                return new ResponseEntity<>(service.save(producto), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/actualizarEst/{id}/{estado}")
    public ResponseEntity<ProductoServicio> actualizarEstado(@PathVariable Integer id, @PathVariable Integer estado) {
        ProductoServicio producto = service.findById(id);
        if (producto != null) {
            try {

                producto.setProdEstado(estado);

                return new ResponseEntity<>(service.save(producto), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/eliminarE/{id}")
    public ResponseEntity<ProductoServicio> actualizarEstado(@PathVariable Integer id, @RequestBody ProductoServicio ps) {
        ProductoServicio producto = service.findById(id);
        if (producto != null) {
            try {

                producto.setProdEstado(0);

                return new ResponseEntity<>(service.save(producto), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<ProductoServicio> elimiarProductos(@PathVariable Integer id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
