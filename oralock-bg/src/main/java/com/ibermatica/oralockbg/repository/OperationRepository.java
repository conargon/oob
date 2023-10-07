package com.ibermatica.oralockbg.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.Operation;

@Repository
public interface OperationRepository extends CrudRepository<Operation, String> {

}
