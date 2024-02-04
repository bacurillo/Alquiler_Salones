/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.Reserva;
import com.m5a.salon.service.ReservaServiceImpl;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Base64;

/**
 *
 * @author LaptopSA
 */
@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    public ReservaServiceImpl reservaService;

    @GetMapping("/listar")
    public ResponseEntity<List<Reserva>> listarReservaciones() {
        return new ResponseEntity<>(reservaService.findByAll(), HttpStatus.OK);
    }

    @GetMapping("/buscar/{id}")
    public Reserva buscarUsuId(@PathVariable Integer id) {
        return reservaService.findById(id);
    }

    @GetMapping("/numReserva")
    public int numReserva() {
        return reservaService.numReserva();
    }

    @GetMapping("/listar/{userId}")
    public ResponseEntity<List<Object[]>> listarReservacionesPorUsuario(@PathVariable Long userId) {
        List<Object[]> reservas = reservaService.findCustomReservasByUserId(userId);
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    @GetMapping("/fechaOcupada/{dia}/{mes}/{anio}")
    public ResponseEntity<Boolean> fechaOcupada(@PathVariable int dia, @PathVariable int mes, @PathVariable int anio) {

        return ResponseEntity.ok(reservaService.fechaOcupada(dia, mes, anio));
    }

    @GetMapping("/listarEst/{est}")
    public ResponseEntity<List<Reserva>> listarReservaEst(@PathVariable int est) {
        return new ResponseEntity<>(reservaService.listarEst(est), HttpStatus.OK);
    }

    @GetMapping("/misReservas/{id}/{est}")
    public ResponseEntity<List<Reserva>> misReservas(@PathVariable int id, @PathVariable int est) {
        return new ResponseEntity<>(reservaService.misReservas(id, est), HttpStatus.OK);
    }

    @GetMapping("/reservaFechas/{ini}/{fin}/{est}")
    public ResponseEntity<List<Reserva>> reservaFechas(@PathVariable String ini, @PathVariable String fin, @PathVariable int est) {
        return new ResponseEntity<>(reservaService.reservaFechas(ini, fin, est), HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Reserva> crearReservaciones(@RequestBody Reserva r) {
        System.out.println("fechaEVENTO= " + r.getResFechaEvento());

        Timestamp fecha = new Timestamp(System.currentTimeMillis());
        r.setResFechaRegistro(fecha);
        return new ResponseEntity<>(reservaService.save(r), HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Reserva> actualizarReservaciones(@PathVariable Integer id, @RequestBody Reserva r) {
        Reserva reserva = reservaService.findById(id);
        if (reserva != null) {
            try {
                reserva.setResId(r.getResId());
                reserva.setResComprobante(r.getResComprobante());
                reserva.setResEstado(r.getResEstado());
                reserva.setReCotiId(r.getReCotiId());
                reserva.setUsuId(r.getUsuId());
                reserva.setResFechaRegistro(r.getResFechaRegistro());

                return new ResponseEntity<>(reservaService.save(reserva), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/validarReserva/{id}/{est}")
    public ResponseEntity<Reserva> validarReserva(@PathVariable Integer id, @PathVariable Integer est, @RequestBody Reserva r) {
        Reserva reserva = reservaService.findById(id);
        if (reserva != null) {
            try {
                reserva.setResEstado(est);
                reserva.setUsuId(r.getUsuId());

                System.out.println("empleado: " + reserva.getUsuId().getUsuId());
                return new ResponseEntity<>(reservaService.save(reserva), HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Reserva> elimiarReservaciones(@PathVariable Integer id) {
        reservaService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Autowired
    private JavaMailSender javaMailSender;

//    @PostMapping("/enviar-correo")
//    public ResponseEntity<String> enviarCorreoConPDF(@RequestBody String pdfData, @RequestParam String destinatario) {
//        System.out.println("====================");
//        System.out.println(pdfData);
//        try {
//            // Decodificar el PDF desde base64
//            byte[] pdfBytes = Base64.getDecoder().decode(pdfData);
//
//            // Crear el mensaje de correo con el PDF adjunto
//            MimeMessage message = javaMailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
//            helper.setTo(destinatario);
//            helper.setSubject("Estado de Reserva");
//            helper.setText("Adjunto encontrarás el estado actual de tu reserva.");
//
//            // Agregar el PDF como archivo adjunto
//            helper.addAttachment("Estado_Reseva.pdf", new ByteArrayResource(pdfBytes));
//
//            // Enviar el correo
//            javaMailSender.send(message);
//
//            return ResponseEntity.ok("Correo enviado correctamente.");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el correo.");
//        }
//    }
    @PostMapping("/enviar-correo")
        public ResponseEntity<String> enviarCorreoConPDF(@RequestBody String pdfData, @RequestParam String destinatario, @RequestParam String estado) {
        System.out.println("====================");
        System.out.println(pdfData);
        try {
            // Decodificar el PDF desde base64
            byte[] pdfBytes = Base64.getDecoder().decode(pdfData);

            // Crear el mensaje de correo con el PDF adjunto
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(destinatario);
            helper.setSubject("Estado de Reserva");
            helper.setText("Su reserva se encuentra en estado: "+ estado+"\nAdjunto encontrarás más detalles de tu reserva.");
            helper.setPriority(1);
            // Agregar el PDF como archivo adjunto
            helper.addAttachment("Estado_Reseva.pdf", new ByteArrayResource(pdfBytes));

            // Enviar el correo
            javaMailSender.send(message);

            return ResponseEntity.ok("Correo enviado correctamente.");
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el correo.");
        }
    }

}
