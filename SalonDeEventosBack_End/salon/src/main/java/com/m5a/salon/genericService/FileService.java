/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.m5a.salon.genericService;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Bryan
 */
public interface FileService {

 /*
    Metodo para crear la carpeta donde vamos a guardar los archivos
     */
    public void init();

    /*
    Metodo para guardar los archivos
     */
    public void save(MultipartFile file);

    /*
    Metodo para cargar un archivo
     */
    public Resource load(String filename);

    /*
    Metodo para borrar todos los archivos cada vez que se inicie el servidor
     */
    public void deleteAll();

    /*
    Metodo para Cargar todos los archivos
     */
    public Stream<Path> loadAll();

    /*
    Metodo para Borrar un archivo
     */
    public String deleteFile(String filename);
}
