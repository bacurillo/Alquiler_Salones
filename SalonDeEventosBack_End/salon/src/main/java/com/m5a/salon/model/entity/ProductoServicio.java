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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author LaptopSA
 */
@Entity
@AllArgsConstructor
@Table(name = "ProductoServicio")
@NoArgsConstructor
public class ProductoServicio implements Serializable{

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
    @Column(name = "prodId")
    private Long prodId;

    @Getter
    @Setter
    @Column(name = "prodNombre")
    private String prodNombre;

    @Getter
    @Setter
    @Column(name = "prodPrecio")
    private double prodPrecio;

    @Getter
    @Setter
    @Column(name = "prodDescripcion")
    private String prodDescripcion;

    @Getter
    @Setter
    @Column(name = "prodEstado")
    private int prodEstado;

    @Getter
    @Setter
    @Column(name = "prodFechaRegistro")
    private Timestamp prodFechaRegistro;

    @JsonIgnore
    @OneToMany(mappedBy = "prodId")
    private List<Adicionales> listaAdicionales;

    @JsonIgnore
    @OneToMany(mappedBy = "prodId")
    private List<ImgProducto> listaImagenesProductos;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "tipId", referencedColumnName = "tipId")
    private Tipo tipId;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "catId", referencedColumnName = "catId")
    private Categoria catId;

}
