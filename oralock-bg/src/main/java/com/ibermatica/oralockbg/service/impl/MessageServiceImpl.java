package com.ibermatica.oralockbg.service.impl;

import java.util.Locale;
import java.util.ResourceBundle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.common.Constants;
import com.ibermatica.oralockbg.model.Option;
import com.ibermatica.oralockbg.model.User;
import com.ibermatica.oralockbg.service.MessageService;
import com.ibermatica.oralockbg.service.OptionService;

@Service
public class MessageServiceImpl implements MessageService {	
	
	@Autowired
	private OptionService optionService;

	@Override
	public String getMessage(String msg, User currentUser) {
		ResourceBundle rb = getMessagesResourceBundle(currentUser);
		return rb.getString(msg);
	}	

    private ResourceBundle getMessagesResourceBundle(User user) {
        Locale locale = new Locale(user.getLang(), "");
        return ResourceBundle.getBundle("messages", locale);
    }

	@Override
	public String getMessage(String msg) {
		Option op = optionService.findById(Constants.DEFAULT_LANG);
		Locale locale = new Locale(op.getValue(), "");
		ResourceBundle rb = ResourceBundle.getBundle("messages", locale);
		return rb.getString(msg);
	}    
    
}
