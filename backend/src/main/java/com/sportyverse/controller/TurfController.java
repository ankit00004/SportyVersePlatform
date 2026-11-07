package com.sportyverse.controller;

import com.sportyverse.model.Turf;
import com.sportyverse.service.TurfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/turfs")
@CrossOrigin(origins = "http://localhost:3000")
public class TurfController {
    
    @Autowired
    private TurfService turfService;
    
    @PostMapping
    public ResponseEntity<?> createTurf(@RequestBody Turf turf) {
        try {
            Turf createdTurf = turfService.createTurf(turf);
            return ResponseEntity.ok(createdTurf);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Turf>> getAllTurfs() {
        return ResponseEntity.ok(turfService.getAllTurfs());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getTurfById(@PathVariable Long id) {
        return turfService.getTurfById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTurf(@PathVariable Long id, @RequestBody Turf turfDetails) {
        try {
            Turf updatedTurf = turfService.updateTurf(id, turfDetails);
            return ResponseEntity.ok(updatedTurf);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTurf(@PathVariable Long id) {
        try {
            turfService.deleteTurf(id);
            return ResponseEntity.ok("Turf deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/sports/{sportsType}")
    public ResponseEntity<List<Turf>> getTurfsBySportsType(@PathVariable String sportsType) {
        return ResponseEntity.ok(turfService.getTurfsBySportsType(sportsType));
    }
    
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Turf>> getTurfsByLocation(@PathVariable String location) {
        return ResponseEntity.ok(turfService.getTurfsByLocation(location));
    }
}