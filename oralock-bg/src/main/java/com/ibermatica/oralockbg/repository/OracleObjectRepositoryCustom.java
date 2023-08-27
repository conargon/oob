package com.ibermatica.oralockbg.repository;

import java.util.List;

import com.ibermatica.oralockbg.model.OracleObject;

public interface OracleObjectRepositoryCustom {

	List<OracleObject> find(String owner, String type, String name, String user, String sort, String dir);
	
}
