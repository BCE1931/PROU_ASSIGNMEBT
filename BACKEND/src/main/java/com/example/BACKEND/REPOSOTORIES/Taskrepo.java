package com.example.BACKEND.REPOSOTORIES;

import com.example.BACKEND.ENTITY.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Taskrepo extends JpaRepository<Task, Long> {
    void deleteByUser(String username);

    List<Task> findByUser(String username);
}
