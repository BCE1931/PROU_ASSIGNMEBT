package com.example.BACKEND.CONTROLLER;

import com.example.BACKEND.ENTITY.Task;
import com.example.BACKEND.ENTITY.User;
import com.example.BACKEND.REPOSOTORIES.Taskrepo;
import com.example.BACKEND.REPOSOTORIES.Userrepo;
import com.example.BACKEND.SECURITY.Validatetoken;
import com.example.BACKEND.SERVICES.Taskservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1")
public class Controller {

    @Autowired
    private Validatetoken validatetoken;

    @Autowired
    private Taskservice taskservice;

    @Autowired
    private Userrepo userrepo;

    @Autowired
    private Taskrepo taskrepo;

    @GetMapping("/topics/{topic}")
    public ResponseEntity<?> topics(@PathVariable String topic, @RequestHeader("Authorization") String authheader){
        if(!validatetoken.validate(authheader.substring(7))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("session expired please try again");
        }
//        List<Mytopcs> topics = service1.gettopics(topic,validatetoken.extractUsername(authheader.substring(7)));
        return new ResponseEntity("hi", HttpStatus.OK);
    }

    @GetMapping("/users/allusers")
    public ResponseEntity<?> allusers(@RequestHeader("Authorization") String authheader){
        if(!validatetoken.validate(authheader.substring(7))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("session expired please try again");
        }
        List<User> usernames = userrepo.findAll();
        List<String> username = usernames.stream().map(User::getUsername).toList();
        return ResponseEntity.ok(username);
    }

    @GetMapping("/work/totaltasks")
    public ResponseEntity<?> totalwork(@RequestHeader("Authorization") String authheader){
        if(!validatetoken.validate(authheader.substring(7))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("session expired please try again");
        }
        List<Task> tasks = taskrepo.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/task/addtask")
    ResponseEntity<?> task(@RequestBody Task task, @RequestHeader("Authorization") String authheader){
        if(!validatetoken.validate(authheader.substring(7))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("session expired please try again");
        }
        String msg = taskservice.addtask(task,validatetoken.extractUsername(authheader.substring(7)));
        return new ResponseEntity(msg, HttpStatus.OK);
    }

    @PutMapping("/task/updatetask/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task task, @RequestHeader("Authorization") String authHeader) {

        if (!validatetoken.validate(authHeader.substring(7))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("session expired please try again");
        }
        String result = taskservice.updateTask(id, task);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/task/deletetask/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        if (!validatetoken.validate(authHeader.substring(7))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("session expired please try again");
        }
        String result = taskservice.deleteTask(id);
        return ResponseEntity.ok(result);
    }
}
