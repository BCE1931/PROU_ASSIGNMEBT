package com.example.BACKEND.ENTITY;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Status status;

    private String user;

    private Date date;

    public enum Status {
        TO_DO,
        IN_PROGRESS,
        COMPLETED
    }
}
