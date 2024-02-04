/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author LaptopSA
 */
@Entity
@Data
@AllArgsConstructor
@Table(name = "Salon")
@NoArgsConstructor
public class Salon implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    /**
     *
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salId")
    private Long salId;

    @Column(name = "salNombre")
    private String salNombre;

    @Column(name = "salonDireccion")
    private String salDireccion;

    @Column(name = "salCapacidad")
    private int salCapacidad;

    @Column(name = "salCostoHora")
    private double salCostoHora;

    @Column(name = "salEstado")
    private int salEstado;

    @Column(name = "salLongitud")
    private float salLongitud;

    @Column(name = "salLatitud")
    private float salLatitud;

    @Column(name = "salFechaRegistro")
    private Timestamp salFechaRegistro;

    @JsonIgnore
    @OneToMany(mappedBy = "salId")
    private List<Cotizacion> listaCotizaciones;

    @JsonIgnore
    @OneToMany(mappedBy = "salId")
    private List<ImgSalon> listaImagenesSalones;

    @ManyToOne
    @JoinColumn(name = "empId", referencedColumnName = "empId")
    private Empresa empId;

}
