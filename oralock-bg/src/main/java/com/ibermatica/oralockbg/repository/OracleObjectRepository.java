package com.ibermatica.oralockbg.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.OracleObject;

@Repository
public interface OracleObjectRepository extends PagingAndSortingRepository<OracleObject, Integer>, OracleObjectRepositoryCustom {
	

}
