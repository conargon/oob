package com.ibermatica.oralockbg.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.Option;

@Repository
public interface OptionRepository extends CrudRepository<Option, String> {

}
