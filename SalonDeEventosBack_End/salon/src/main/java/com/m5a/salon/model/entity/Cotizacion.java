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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
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
@Table(name = "Cotizacion")
@NoArgsConstructor
public class Cotizacion implements Serializable {

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
    @Column(name = "cotiId")
    private Long cotiId;

    @Getter
    @Setter
    @Column(name = "cotiTipoEvento")
    private String cotiTipoEvento;

    @Getter
    @Setter
    @Column(name = "cotiFechaEvento")
    private Date cotiFechaEvento;

    @Getter
    @Setter
    @Column(name = "cotiDescripcion")
    private String cotiDescripcion;

    @Getter
    @Setter
    @Column(name = "cotiEstado")
    private int cotiEstado;

    @Getter
    @Setter
    @Column(name = "cotiMonto")
    private double cotiMonto;

    @Getter
    @Setter
    @Column(name = "cotiHoraFin")
    private String cotiHoraFin;

    @Getter
    @Setter
    @Column(name = "cotiHoraInicio")
    private String cotiHoraInicio;

    @Getter
    @Setter
    @Column(name = "cotiFechaRegistro")
    private Timestamp cotiFechaRegistro;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "salId", referencedColumnName = "salId")
    private Salon salId;

    @JsonIgnore
    @OneToMany(mappedBy = "cotiId")
    private List<Adicionales> listaAdicionales;

    @JsonIgnore
    @OneToOne(mappedBy = "reCotiId")
    private Reserva reCotiId;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "usuId", referencedColumnName = "usuId")
    private Usuario usuId;

}
