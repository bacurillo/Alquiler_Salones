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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Date;

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
@Table(name = "Persona")
public class Persona implements Serializable {

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
    @Column(name = "perId")
    private Long perId;

    @Getter
    @Setter
    @Column(unique = true, name = "perCedula")
    private String perCedula;

    @Getter
    @Setter
    @Column(name = "perNombre")
    private String perNombre;

    @Getter
    @Setter
    @Column(name = "perApellido")
    private String perApellido;

    @Getter
    @Setter
    @Column(name = "perCorreo")
    private String perCorreo;

    @Getter
    @Setter
    @Column(name = "perDireccion")
    private String perDireccion;

    @Getter
    @Setter
    @Column(name = "perTelefono")
    private String perTelefono;

    @Getter
    @Setter
    @Column(name = "perFechaNacimiento")
    private Date perFechaNacimiento;

    @OneToOne(mappedBy = "usuPerId")
    private Usuario usuario;
}
