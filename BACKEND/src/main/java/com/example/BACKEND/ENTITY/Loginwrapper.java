package com.example.BACKEND.ENTITY;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Loginwrapper {

    private String username;

    private String password;

    private String project;

    private boolean admin;

    public boolean getAdmin() {return admin;}

    public void setAdmin(boolean admin) {this.admin = admin;}

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getProject() {
        return project;
    }
}
