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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

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
@Table(name = "Reserva")
@NoArgsConstructor
public class Reserva implements Serializable {

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
    @Column(name = "reservaId")
    private Long resId;

    @Getter
    @Setter
    @Column(name = "resEstado")
    private int resEstado;

    @Getter
    @Setter
    @Column(name = "resImagenRerserva")
    private int resImagenRerserva;

    @Getter
    @Setter
    @Column(name = "resComprobante")
    private String resComprobante;

    @Getter
    @Setter
    @Column(name = "resFechaRegistro")
    private Timestamp resFechaRegistro;

    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "reCotiId")
    private Cotizacion reCotiId;

    @Getter
    @Setter
    @Column(name = "resFechaEvento")
    private Date resFechaEvento;

    @Getter
    @Setter 
    @ManyToOne
    @JoinColumn(name = "usuId", referencedColumnName = "usuId")
    private Usuario usuId;

}
