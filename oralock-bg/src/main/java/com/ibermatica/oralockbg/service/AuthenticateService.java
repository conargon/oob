package com.ibermatica.oralockbg.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.ibermatica.oralockbg.dto.UserDto;
import com.ibermatica.oralockbg.model.User;

public interface AuthenticateService extends UserDetailsService {
	
	UserDto authenticate(String username, String password);
	
	User getCurrentUser(String authorization);
	
	String getCurrentRole(String authorization);

}
