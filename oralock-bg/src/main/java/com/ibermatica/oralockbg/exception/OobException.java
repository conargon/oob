package com.ibermatica.oralockbg.exception;

public class OobException extends RuntimeException {

	private static final long serialVersionUID = -5012481818150460228L;

	public OobException(String msg, Throwable t) {
		super(msg, t);
	}

	public OobException(String msg) {
		super(msg);
	}
}
