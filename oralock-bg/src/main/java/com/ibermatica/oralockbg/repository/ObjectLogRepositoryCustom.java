package com.ibermatica.oralockbg.repository;

import java.util.List;

import com.ibermatica.oralockbg.model.ObjectLog;

public interface ObjectLogRepositoryCustom {
	
	List<ObjectLog> find(String owner, String type, String name, String sort, String dir);

}
