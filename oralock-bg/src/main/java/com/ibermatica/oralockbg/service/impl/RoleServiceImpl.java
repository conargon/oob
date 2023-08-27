package com.ibermatica.oralockbg.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.dto.RoleDto;
import com.ibermatica.oralockbg.mapper.RoleMapper;
import com.ibermatica.oralockbg.model.Role;
import com.ibermatica.oralockbg.repository.RoleRepository;
import com.ibermatica.oralockbg.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private RoleMapper roleMapper;

	@Override
	public List<RoleDto> getAll() {
		Iterable<Role> iterable = roleRepository.findAll();
		return roleMapper.toDtoList(StreamSupport
				  .stream(iterable.spliterator(), false)
				  .collect(Collectors.toList()));
	}

}
