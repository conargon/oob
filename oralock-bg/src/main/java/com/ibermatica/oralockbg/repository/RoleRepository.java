package com.ibermatica.oralockbg.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, String> {

}
