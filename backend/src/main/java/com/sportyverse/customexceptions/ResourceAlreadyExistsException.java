package com.sportyverse.customexceptions;

public class ResourceAlreadyExistsException extends RuntimeException {
	public ResourceAlreadyExistsException(String mesg) {
		super(mesg) ;
	}
}