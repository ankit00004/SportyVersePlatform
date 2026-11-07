package com.sportyverse.repository;

import com.sportyverse.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByCustomerId(Long customerId);
    
    List<Booking> findByTurfId(Long turfId);
    
    List<Booking> findByBookingDate(LocalDate bookingDate);
    
    @Query("SELECT b FROM Booking b WHERE b.turfId = ?1 AND b.bookingDate = ?2 " +
           "AND ((b.startTime <= ?3 AND b.endTime > ?3) OR (b.startTime < ?4 AND b.endTime >= ?4) " +
           "OR (b.startTime >= ?3 AND b.endTime <= ?4))")
    List<Booking> findConflictingBookings(Long turfId, LocalDate date, LocalTime startTime, LocalTime endTime);
    
    List<Booking> findByCustomerIdOrderByBookingDateDesc(Long customerId);
}