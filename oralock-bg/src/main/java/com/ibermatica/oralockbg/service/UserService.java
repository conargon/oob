package com.ibermatica.oralockbg.service;

import java.util.List;

import com.ibermatica.oralockbg.dto.UserDto;
import com.ibermatica.oralockbg.model.User;

public interface UserService {
	
	List<UserDto> getAll(String search, String sort, String dir);
	
	UserDto getById(String id);
	
	UserDto save(UserDto user, User currentUser);
	
	UserDto disable(String id, User currentUser);
	
	UserDto enable(String id, User currentUser);
}
