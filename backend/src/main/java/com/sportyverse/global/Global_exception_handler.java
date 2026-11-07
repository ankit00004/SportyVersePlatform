package com.sportyverse.global;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.sportyverse.customexceptions.ResourceAlreadyExistsException;
import com.sportyverse.customexceptions.ResourceNotFoundException;

import jakarta.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;

@RestControllerAdvice
@AllArgsConstructor
public class Global_exception_handler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				             .body("Resource Not Found") ;	                     
	}
	
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ResponseEntity<?> handleResourceAlreadyExistsException(ResourceAlreadyExistsException e){
		return ResponseEntity.status(HttpStatus.CONFLICT)
				             .body("Resource Not Found") ;	                     
	}
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				             .body("Resource Not Found") ;	                     
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		
		// list all rejected field 
		List<FieldError> errorField = e.getFieldErrors() ;
		
		Map<String , String> errorFieldMap = errorField.stream()
				                                       .collect(Collectors.toMap(
				                                    		   FieldError::getField, 
				                                    		   FieldError::getDefaultMessage)) ;
		
		return new ResponseEntity<>(errorFieldMap , HttpStatus.BAD_REQUEST) ;
	}
	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e) {
	
		Map<String , String> errors = e.getConstraintViolations()
				                       .stream()
				                       .collect(Collectors.toMap(
				                    		   v -> v.getPropertyPath().toString() , 
				                    		   v -> v.getMessage())) ;
	
		return new ResponseEntity<>(errors , HttpStatus.BAD_REQUEST) ;

	}
	
}
