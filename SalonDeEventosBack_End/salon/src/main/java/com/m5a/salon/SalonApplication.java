package com.m5a.salon;

import com.m5a.salon.genericService.FileService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import jakarta.annotation.Resource;
import java.util.Properties;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "INTERFAZ SWAGGER PARA LA RESERVA DE SALONES DE EVENTOS",
                version = "1.0.0",
                description = "PROYECTO REALIZADO POR EL M5A",
                termsOfService = "M5A",
                contact = @Contact(
                        name = "Instituto Superior Tecnologico Del Azuay",
                        email = "info@tecazuay.edu.ec"
                )
        )
)
public class SalonApplication implements CommandLineRunner {

    @Resource
    FileService fileService;

    public static void main(String[] args) {
        SpringApplication.run(SalonApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }

    @Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void run(String... args) throws Exception {
//        fileService.deleteAll();
//        fileService.init();   
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("perruncay@gmail.com"); // Coloca tu correo de Gmail aquí
        mailSender.setPassword("kqmzhfizwzeofgve"); // Coloca tu contraseña de Gmail aquí

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.starttls.required", "true");

        return mailSender;
    }

}
