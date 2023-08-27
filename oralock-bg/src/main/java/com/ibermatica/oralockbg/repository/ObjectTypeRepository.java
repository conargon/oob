package com.ibermatica.oralockbg.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.ObjectType;

@Repository
public interface ObjectTypeRepository extends PagingAndSortingRepository<ObjectType, String> {

	List<ObjectType> findByIdNotIn(List<String> list);
	
}
