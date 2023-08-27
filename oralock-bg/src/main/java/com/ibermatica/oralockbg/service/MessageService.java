package com.ibermatica.oralockbg.service;

import com.ibermatica.oralockbg.model.User;

public interface MessageService {
		
	String getMessage(String msg, User currentUser);

}
