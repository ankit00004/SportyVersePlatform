package com.sportyverse.controller;

import com.sportyverse.dto.JwtResponse;
import com.sportyverse.dto.LoginRequest;
import com.sportyverse.dto.SignupRequest;
import com.sportyverse.model.User;
import com.sportyverse.security.JwtTokenProvider;
import com.sportyverse.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Verify user exists with specified role
            User user = userService.findByUsernameAndRole(
                loginRequest.getUsername(), 
                User.Role.valueOf(loginRequest.getRole())
            ).orElseThrow(() -> new RuntimeException("Invalid username or role"));
            
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            
            return ResponseEntity.ok(new JwtResponse(
                jwt,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getFullName()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            if (userService.existsByUsername(signupRequest.getUsername())) {
                return ResponseEntity.badRequest().body("Error: Username is already taken!");
            }
            
            if (userService.existsByEmail(signupRequest.getEmail())) {
                return ResponseEntity.badRequest().body("Error: Email is already in use!");
            }
            
            User user = new User();
            user.setUsername(signupRequest.getUsername());
            user.setPassword(signupRequest.getPassword());
            user.setEmail(signupRequest.getEmail());
            user.setFullName(signupRequest.getFullName());
            user.setRole(User.Role.valueOf(signupRequest.getRole()));
            user.setPhone(signupRequest.getPhone());
            
            userService.createUser(user);
            
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}