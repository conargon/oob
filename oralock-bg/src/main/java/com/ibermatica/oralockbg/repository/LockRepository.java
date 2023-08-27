package com.ibermatica.oralockbg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.Lock;

@Repository
public interface LockRepository extends CrudRepository<Lock, Integer> {
	
	@Query("SELECT u FROM Lock u WHERE u.user = :user")
	List<Lock> findAllLocksByUser(@Param("user") String user);

}
