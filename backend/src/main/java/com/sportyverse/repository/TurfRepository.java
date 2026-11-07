package com.sportyverse.repository;

import com.sportyverse.model.Turf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TurfRepository extends JpaRepository<Turf, Long> {
    
    List<Turf> findBySportsType(String sportsType);
    
    List<Turf> findByLocation(String location);
    
    List<Turf> findByCreatedBy(Long createdBy);
}