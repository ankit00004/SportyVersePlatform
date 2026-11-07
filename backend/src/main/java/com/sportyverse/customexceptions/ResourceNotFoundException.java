package com.sportyverse.customexceptions;

public class ResourceNotFoundException extends RuntimeException {

	public ResourceNotFoundException(String mesg) {
		super(mesg) ;
	}

}
