package com.sportyverse.service;

import com.sportyverse.model.Turf;
import com.sportyverse.repository.TurfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TurfService {
    
    @Autowired
    private TurfRepository turfRepository;
    
    public Turf createTurf(Turf turf) {
        return turfRepository.save(turf);
    }
    
    public List<Turf> getAllTurfs() {
        return turfRepository.findAll();
    }
    
    public Optional<Turf> getTurfById(Long id) {
        return turfRepository.findById(id);
    }
    
    public Turf updateTurf(Long id, Turf turfDetails) {
        Turf turf = turfRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turf not found"));
        
        turf.setName(turfDetails.getName());
        turf.setLocation(turfDetails.getLocation());
        turf.setSportsType(turfDetails.getSportsType());
        turf.setPricePerHour(turfDetails.getPricePerHour());
        turf.setDescription(turfDetails.getDescription());
        turf.setCapacity(turfDetails.getCapacity());
        turf.setAvailableFrom(turfDetails.getAvailableFrom());
        turf.setAvailableTo(turfDetails.getAvailableTo());
        
        return turfRepository.save(turf);
    }
    
    public void deleteTurf(Long id) {
        turfRepository.deleteById(id);
    }
    
    public List<Turf> getTurfsBySportsType(String sportsType) {
        return turfRepository.findBySportsType(sportsType);
    }
    
    public List<Turf> getTurfsByLocation(String location) {
        return turfRepository.findByLocation(location);
    }
}