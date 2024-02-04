/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.repository;

import com.m5a.salon.model.entity.Usuario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LaptopSA
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    @Query(value = "SELECT COUNT(*) FROM usuario WHERE usu_nombre_usuario = :usuario", nativeQuery = true)
    int usuarioUnico(@Param("usuario") String usuario);

    @Query(value = "SELECT * FROM usuario WHERE usu_nombre_usuario = :usuario", nativeQuery = true)
    Usuario buscarUsuario(@Param("usuario") String usuario);

    @Query(value = "SELECT * FROM usuario WHERE usu_estado= :est", nativeQuery = true)
    List<Usuario> listarUsu(@Param("est") int est);

    @Query(value = "SELECT u.* "
            + "FROM usuario u "
            + "JOIN persona p ON u.usu_per_id = p.per_id "
            + "JOIN rol r ON u.rol_id = r.rol_id "
            + "WHERE u.usu_estado = :est "
            + "  AND (LOWER(p.per_cedula) LIKE CONCAT('%', :busqueda, '%') "
            + "       OR LOWER(u.usu_nombre_usuario) LIKE CONCAT('%', :busqueda, '%') "
            + "       OR LOWER(p.per_nombre) LIKE CONCAT('%', :busqueda, '%') "
            + "       OR LOWER(p.per_apellido) LIKE CONCAT('%', :busqueda, '%') "
            + "       OR LOWER(r.rol_nombre) LIKE CONCAT('%', :busqueda, '%') "
            + "      )", nativeQuery = true)
    List<Usuario> busquedaU(@Param("busqueda") String busqueda, @Param("est") int est);

    @Query(value = "SELECT * FROM usuario WHERE usu_nombre_usuario = :usuario AND usu_contrasena = :password", nativeQuery = true)
    public Usuario login(@Param("usuario") String usuario, @Param("password") String password);
}
