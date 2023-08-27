package com.ibermatica.oralockbg.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.User;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, String> {
	
	List<User> findByIdContainingIgnoreCaseOrNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String id, String name, String email);

}
