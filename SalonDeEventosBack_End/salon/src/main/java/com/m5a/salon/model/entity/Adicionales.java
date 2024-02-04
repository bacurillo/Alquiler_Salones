/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author LaptopSA
 */
@Entity
@AllArgsConstructor
@Table(name = "adicionales")
@NoArgsConstructor
@Data
public class Adicionales implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    /**
     *
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adiId")
    private Long adiId;

    @Setter
    @Getter
    @Column(name = "adiFechaRegistro")
    private Timestamp adiFechaRegistro;

    @Setter
    @Getter
    @Column(name = "adiCantidad")
    private int adiCantidad;

    @ManyToOne
    @JoinColumn(name = "cotiId", referencedColumnName = "cotiId")
    private Cotizacion cotiId;

    @ManyToOne
    @JoinColumn(name = "prodId", referencedColumnName = "prodId")
    private ProductoServicio prodId;
}
