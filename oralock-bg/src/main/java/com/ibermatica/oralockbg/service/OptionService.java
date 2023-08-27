package com.ibermatica.oralockbg.service;

import com.ibermatica.oralockbg.dto.OptionsDTO;
import com.ibermatica.oralockbg.model.Option;
import com.ibermatica.oralockbg.model.User;

public interface OptionService {
	
	Option findById(String id);
	
	void save(OptionsDTO options, User currentUser);
		
}
