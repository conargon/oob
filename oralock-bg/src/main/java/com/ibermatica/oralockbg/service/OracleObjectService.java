package com.ibermatica.oralockbg.service;

import java.util.List;

import com.ibermatica.oralockbg.dto.OracleObjectDto;

public interface OracleObjectService {	
	
	List<OracleObjectDto> find(String owner, String type, String name, String user, String sort, String dir);

}
