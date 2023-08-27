package com.ibermatica.oralockbg.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.ObjectLog;

@Repository
public interface ObjectLogRepository extends CrudRepository<ObjectLog, Integer>, ObjectLogRepositoryCustom {	
		
}
