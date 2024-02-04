/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.m5a.salon.Exception;

import com.m5a.salon.model.entity.FileMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

/**
 *
 * @author Bryan
 */
@ControllerAdvice
public class FileUploadException {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<FileMessage> maxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .body(new FileMessage("Uno o mas archivos exceden el tamaño maximo"));
    }
}
