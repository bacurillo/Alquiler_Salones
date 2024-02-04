/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.service;

import com.m5a.salon.genericService.GenericService;
import com.m5a.salon.genericService.GenericServiceImpl;
import com.m5a.salon.model.entity.Usuario;
import com.m5a.salon.repository.UsuarioRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author LaptopSA
 */
@Service
public class UsuarioServiceImpl extends GenericServiceImpl<Usuario, Integer> implements GenericService<Usuario, Integer> {

    @Autowired
    public UsuarioRepository usuarioRepository;

    @Override
    public CrudRepository<Usuario, Integer> getDao() {
        return usuarioRepository;
    }

    public Usuario LogIn(String usuario, String password) {
        return usuarioRepository.login(usuario, password);
    }

    public Usuario buscarUsuario(String usuario) {
        return usuarioRepository.buscarUsuario(usuario);
    }

    public List<Usuario> busquedaUsu(String busqueda, int est) {
        return usuarioRepository.busquedaU(busqueda, est);
    }

    public boolean usuarioExiste(String usuario) {

        int usuarios = usuarioRepository.usuarioUnico(usuario);
        if (usuarios > 0) {
            return true;
        } else {
            return false;
        }
    }

    public List<Usuario> listarUsu(int est) {
        return usuarioRepository.listarUsu(est);
    }
}
