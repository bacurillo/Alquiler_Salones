/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Rol;
import com.m5a.salon.model.entity.Usuario;
import com.m5a.salon.service.UsuarioServiceImpl;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    public UsuarioServiceImpl usuarioService;

    @Autowired
    PasswordEncoder PasswordEncoder;

    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return new ResponseEntity<>(usuarioService.findByAll(), HttpStatus.OK);
    }

    @GetMapping("/busqueda/{busqueda}/{est}")
    public ResponseEntity<List<Usuario>> busquedaUsuarios(@PathVariable String busqueda, @PathVariable int est) {
        return new ResponseEntity<>(usuarioService.busquedaUsu(busqueda, est), HttpStatus.OK);
    }

    @GetMapping("/listar/{est}")
    public ResponseEntity<List<Usuario>> listarUsuEst(@PathVariable int est) {
        return new ResponseEntity<>(usuarioService.listarUsu(est), HttpStatus.OK);
    }

    //LOG IN
    @GetMapping("/login/{usuario}/{password}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable String usuario, @PathVariable String password) {

        Usuario usuarioEncontrado = new Usuario();
        usuarioEncontrado = usuarioService.buscarUsuario(usuario);
//        System.out.println("pass= "+usuarioEncontrado.getUsuContrasena());
//        usuarioEncontrado = usuarioService.LogIn(usuario, password);

        System.out.println(usuarioEncontrado.getUsuContrasena() + "==" + password);
        if (PasswordEncoder.matches(password, usuarioEncontrado.getUsuContrasena())) {
            return new ResponseEntity<>(usuarioEncontrado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/usuarioExiste/{usuario}")
    public ResponseEntity<Boolean> usuarioExiste(@PathVariable String usuario) {

        return ResponseEntity.ok(usuarioService.usuarioExiste(usuario));
    }

    @PostMapping("/crear")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario u) {
        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        u.setUsuFechaRegistro(fecha);

        u.setUsuContrasena(PasswordEncoder.encode(u.getUsuContrasena()));
        return new ResponseEntity<>(usuarioService.save(u), HttpStatus.CREATED);
    }

    @GetMapping("/buscar/{id}")
    public Usuario buscarUsuId(@PathVariable Integer id) {
        return usuarioService.findById(id);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario u) {
        Usuario encontrado = usuarioService.findById(id);

        if (encontrado != null) {

            try {
                System.out.println(u.getUsuContrasena() + "==" + encontrado.getUsuContrasena());
                if (PasswordEncoder.matches(u.getUsuContrasena(), encontrado.getUsuContrasena()) || u.getUsuContrasena().equalsIgnoreCase(encontrado.getUsuContrasena())) {
//                    encontrado.setUsuContrasena(u.getUsuContrasena());
                    System.out.println("IGUAL");
                } else {
                    encontrado.setUsuContrasena(PasswordEncoder.encode(u.getUsuContrasena()));
                    System.out.println("CODIFICADO");
                }
                encontrado.setUsuFechaRegistro(u.getUsuFechaRegistro());
                encontrado.setUsuNombreUsuario(u.getUsuNombreUsuario());
                encontrado.setUsuPerId(u.getUsuPerId());
                encontrado.setUsuFechaRegistro(u.getUsuFechaRegistro());
                encontrado.setRolId(u.getRolId());
                return new ResponseEntity<>(usuarioService.save(encontrado), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/actualizarEst/{id}/{estado}")
    public ResponseEntity<Usuario> actualizarEstado(@PathVariable Integer id, @PathVariable Integer estado) {
        Usuario encontrado = usuarioService.findById(id);

        if (encontrado != null) {

            try {
                encontrado.setUsuEstado(estado);
                return new ResponseEntity<>(usuarioService.save(encontrado), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Rol> elimiarUsuario(@PathVariable Integer id) {
        usuarioService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
