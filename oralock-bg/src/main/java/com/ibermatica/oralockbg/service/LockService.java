package com.ibermatica.oralockbg.service;

import java.util.List;

import com.ibermatica.oralockbg.dto.LockDto;
import com.ibermatica.oralockbg.model.User;

public interface LockService {

	public LockDto save(LockDto lockDto, User currentUser);
	
	public void delete(Integer id, User currentUser);
	
	public List<LockDto> getAll(User currentUser);
}
