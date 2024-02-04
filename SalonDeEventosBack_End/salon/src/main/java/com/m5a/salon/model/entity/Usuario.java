/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author LaptopSA
 */
@Entity
@Table(name = "Usuario")
public class Usuario implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    /**
     *
     */

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuId")
    private Long usuId;

    @Getter
    @Setter
    @Column(name = "usuNombreUsuario")
    private String usuNombreUsuario;

    @Getter
    @Setter
    @Column(name = "usuContrasena")
    private String usuContrasena;

    @Getter
    @Setter
    @Column(name = "usuEstado")
    private int usuEstado;

    @Getter
    @Setter
    @Column(name = "usuFechaRegistro")
    private Timestamp usuFechaRegistro;

    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "usuPerId")
    private Persona usuPerId;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "rolId", referencedColumnName = "rolId")
    private Rol rolId;

    @JsonIgnore
    @OneToMany(mappedBy = "usuId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Cotizacion> listaCotizaciones;

    @JsonIgnore
    @OneToMany(mappedBy = "usuId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reserva> listaReservas;
}
