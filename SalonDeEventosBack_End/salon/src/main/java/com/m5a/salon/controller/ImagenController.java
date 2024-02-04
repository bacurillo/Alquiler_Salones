/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.controller;

import com.m5a.salon.model.entity.ImagenReserva;
import com.m5a.salon.repository.ImagenRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author LaptopSA
 */
@RestController
@RequestMapping("/imagen")
public class ImagenController {

    @Autowired
    private ImagenRepository imagenRepository;

    @PostMapping("/guardar-imagen")
    public ResponseEntity<String> guardarImagen(@RequestBody byte[] imagenBytes) {

        try {
            ImagenReserva imagen = new ImagenReserva();
            imagen.setDatosImagenReserva(imagenBytes);
            imagenRepository.save(imagen);

            // Devolver el ID de la imagen en la respuesta como String
            String imageId = String.valueOf(imagen.getIdImagenReserva());

            return ResponseEntity.ok(imageId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen");
        }
    }

    @GetMapping("/obtener-archivo/{id}")
    public ResponseEntity<byte[]> obtenerArchivoPorId(@PathVariable Long id) {
        Optional<ImagenReserva> imagenOptional = imagenRepository.findById(id);
        if (imagenOptional.isPresent()) {
            ImagenReserva imagen = imagenOptional.get();
            byte[] archivoBytes = imagen.getDatosImagenReserva();

            // Obtener el tipo de contenido adecuado según la extensión del archivo
            String fileName = "archivo";
            MediaType contentType;
            if (fileName.toLowerCase().endsWith(".pdf")) {
                contentType = MediaType.APPLICATION_PDF;
            } else if (fileName.toLowerCase().endsWith(".png")) {
                contentType = MediaType.IMAGE_PNG;
            } else if (fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".jpeg")) {
                contentType = MediaType.IMAGE_JPEG;
            } else {
                // Si no se reconoce el tipo de archivo, se devuelve un tipo de contenido genérico
                contentType = MediaType.APPLICATION_OCTET_STREAM;
            }

            // Establecer el tipo de contenido en el encabezado de la respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(contentType);

            return new ResponseEntity<>(archivoBytes, headers, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/obtener-imagen2/{id}")
    public ResponseEntity<byte[]> obtenerImagenPorId2(@PathVariable Long id) {
        Optional<ImagenReserva> imagenOptional = imagenRepository.findById(id);
        if (imagenOptional.isPresent()) {
            ImagenReserva imagen = imagenOptional.get();
            return ResponseEntity.ok(imagen.getDatosImagenReserva());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
