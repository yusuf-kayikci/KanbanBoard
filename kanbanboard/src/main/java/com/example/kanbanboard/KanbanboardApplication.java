package com.example.kanbanboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resources;

@SpringBootApplication
public class KanbanboardApplication {
    public static void main(String[] args) {
        SpringApplication.run(KanbanboardApplication.class, args);
    }
}
