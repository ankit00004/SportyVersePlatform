package com.sportyverse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SportyverseApplication {
    public static void main(String[] args) {
        SpringApplication.run(SportyverseApplication.class, args);
        System.out.println("Sportyverse Application Started Successfully!");
        System.out.println("Backend running on: http://localhost:8080");
    }
}
