package com.ibermatica.oralockbg.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.RegisteredSchema;

@Repository
public interface RegisteredSchemaRepository extends CrudRepository<RegisteredSchema, String> {

}
