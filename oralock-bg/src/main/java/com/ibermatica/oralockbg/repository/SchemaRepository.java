package com.ibermatica.oralockbg.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.Schema;

@Repository
public interface SchemaRepository extends PagingAndSortingRepository<Schema, String> {

	List<Schema> findByUsernameNotIn(List<String> list);
}
