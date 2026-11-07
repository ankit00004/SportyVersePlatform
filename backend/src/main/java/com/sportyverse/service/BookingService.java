package com.sportyverse.service;

import com.sportyverse.model.Booking;
import com.sportyverse.model.Turf;
import com.sportyverse.model.User;
import com.sportyverse.repository.BookingRepository;
import com.sportyverse.repository.TurfRepository;
import com.sportyverse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private TurfRepository turfRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Booking createBooking(Booking booking) {
        // Check for conflicting bookings
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
            booking.getTurfId(), 
            booking.getBookingDate(), 
            booking.getStartTime(), 
            booking.getEndTime()
        );
        
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("This time slot is already booked");
        }
        
        // Calculate total hours and price
        Turf turf = turfRepository.findById(booking.getTurfId())
                .orElseThrow(() -> new RuntimeException("Turf not found"));
        
        long minutes = Duration.between(booking.getStartTime(), booking.getEndTime()).toMinutes();
        int hours = (int) Math.ceil(minutes / 60.0);
        
        booking.setTotalHours(hours);
        booking.setTotalPrice(turf.getPricePerHour().multiply(BigDecimal.valueOf(hours)));
        
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        enrichBookingsWithDetails(bookings);
        return bookings;
    }
    
    public List<Booking> getBookingsByCustomerId(Long customerId) {
        List<Booking> bookings = bookingRepository.findByCustomerIdOrderByBookingDateDesc(customerId);
        enrichBookingsWithDetails(bookings);
        return bookings;
    }
    
    public Optional<Booking> getBookingById(Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        booking.ifPresent(b -> enrichBookingsWithDetails(List.of(b)));
        return booking;
    }
    
    public Booking updateBooking(Long id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        // Check for conflicts excluding current booking
        List<Booking> conflicts = bookingRepository.findConflictingBookings(
            bookingDetails.getTurfId(), 
            bookingDetails.getBookingDate(), 
            bookingDetails.getStartTime(), 
            bookingDetails.getEndTime()
        );
        conflicts.removeIf(b -> b.getId().equals(id));
        
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("This time slot is already booked");
        }
        
        Turf turf = turfRepository.findById(bookingDetails.getTurfId())
                .orElseThrow(() -> new RuntimeException("Turf not found"));
        
        long minutes = Duration.between(bookingDetails.getStartTime(), bookingDetails.getEndTime()).toMinutes();
        int hours = (int) Math.ceil(minutes / 60.0);
        
        booking.setBookingDate(bookingDetails.getBookingDate());
        booking.setStartTime(bookingDetails.getStartTime());
        booking.setEndTime(bookingDetails.getEndTime());
        booking.setTotalHours(hours);
        booking.setTotalPrice(turf.getPricePerHour().multiply(BigDecimal.valueOf(hours)));
        booking.setStatus(bookingDetails.getStatus());
        booking.setPaymentStatus(bookingDetails.getPaymentStatus());
        
        return bookingRepository.save(booking);
    }
    
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    
    private void enrichBookingsWithDetails(List<Booking> bookings) {
        for (Booking booking : bookings) {
            turfRepository.findById(booking.getTurfId()).ifPresent(turf -> {
                booking.setTurfName(turf.getName());
                booking.setSportsType(turf.getSportsType());
                booking.setLocation(turf.getLocation());
            });
            
            userRepository.findById(booking.getCustomerId()).ifPresent(user -> {
                booking.setCustomerName(user.getFullName());
            });
        }
    }
}