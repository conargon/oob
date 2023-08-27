package com.ibermatica.oralockbg.service.impl;

import java.util.Locale;
import java.util.ResourceBundle;

import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.model.User;
import com.ibermatica.oralockbg.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {	

	@Override
	public String getMessage(String msg, User currentUser) {
		ResourceBundle rb = getMessagesResourceBundle(currentUser);
		return rb.getString(msg);
	}	

    private ResourceBundle getMessagesResourceBundle(User user) {
        Locale locale = new Locale(user.getLang(), "");
        return ResourceBundle.getBundle("messages", locale);
    }    
    
}
