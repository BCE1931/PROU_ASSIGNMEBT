package com.example.BACKEND.SERVICES;

import com.example.BACKEND.ENTITY.Task;
import com.example.BACKEND.REPOSOTORIES.Taskrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class Taskservice {

    @Autowired
    private Taskrepo repo;

    public String addtask(Task task, String s) {
        Task task1 = new Task();
        task1.setDate(Date.valueOf(LocalDate.now()));
        task1.setUser(task.getUser());
        task1.setStatus(task.getStatus());
        task1.setTitle(task.getTitle());
        repo.save(task1);
        return "added successfully";
    }

    public String updateTask(Long id, Task updated) {
        Optional<Task> existing = repo.findById(id);
        if (existing.isEmpty()) {
            return "Task not found";
        }
        Task task = existing.get();
        task.setTitle(updated.getTitle());
        task.setStatus(updated.getStatus());
        task.setUser(updated.getUser());

        repo.save(task);

        return "Task updated successfully";
    }

    public String deleteTask(Long id) {
        Optional<Task> existing = repo.findById(id);
        if (existing.isEmpty()) {
            return "Task not found";
        }
        repo.delete(existing.get());
        return "Task deleted successfully";
    }

    public boolean deletetask(String username) {
        List<Task> tasks = repo.findByUser(username);

        if (tasks.isEmpty()) {
            return true; // nothing to delete
        }

        repo.deleteAll(tasks);
        return true;
    }
}
