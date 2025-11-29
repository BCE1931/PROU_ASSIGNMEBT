package com.example.BACKEND.CONTROLLER;

import com.example.BACKEND.ENTITY.*;
import com.example.BACKEND.REPOSOTORIES.Userrepo;
import com.example.BACKEND.SECURITY.TokenGeneration;
import com.example.BACKEND.SECURITY.Validatetoken;
import com.example.BACKEND.SERVICES.Userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/oauth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private Userservice userservice;

    @Autowired
    private TokenGeneration tokenGeneration;

    @Autowired
    private Userrepo userrepo;


    @Value("${jwt-secret}")
    private String jwtsecret;

    @Value("${jwt.expiration}")
    private String jwtexpiration;

    @Value("${jwt.refresh-expiration}")
    private String jwtrefreshexpiration;

    @Autowired
    private Validatetoken validatetoken;

    @GetMapping("/hi")
    public String entry(){
        return "hi this is page after login";
    }

    @GetMapping("/user-info")
    public Map<String,Object> user(@AuthenticationPrincipal OAuth2User principal){
        Map<String,Object> map = new HashMap<>(principal.getAttributes());
        String email = (String) map.get("email");
        if(email != null && userrepo.existsByEmail(email)){
            String username = userrepo.findByEmail(email);
            map.put("exist",true);
            map.put("username",username);
        }
        else{
            map.put("exist",false);
        }
        return map;
    }


    @PostMapping("/register")
    public Outputwrapper register(@RequestBody Registerwrapper registerwrapper){
        return userservice.register(registerwrapper);
    }

    @PostMapping("/login")
    public Outputwrapper login(@RequestBody Loginwrapper loginwrapper){
        System.out.println(loginwrapper.getProject());
        return userservice.login(loginwrapper);
    }

    @GetMapping("/users/allusers")
    public ResponseEntity<?> allUsers(@RequestHeader("Authorization") String authHeader) {

        if (!validatetoken.validate(authHeader.substring(7))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("session expired please try again");
        }
        List<User> users = userrepo.findAll();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Integer id,
            @RequestHeader("Authorization") String authHeader) {

        if (!validatetoken.validate(authHeader.substring(7))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("session expired please try again");
        }
        return userservice.deleteuser(id);
    }





//    @GetMapping("/authlogin")
//    public String authlogin(){
//        return customOAuth2UserService.getUsername();
//    }

}
