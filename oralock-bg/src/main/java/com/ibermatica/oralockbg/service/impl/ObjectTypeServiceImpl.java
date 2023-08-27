package com.ibermatica.oralockbg.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.dto.ObjectTypeDto;
import com.ibermatica.oralockbg.mapper.ObjectTypeMapper;
import com.ibermatica.oralockbg.model.ObjectType;
import com.ibermatica.oralockbg.repository.ObjectTypeRepository;
import com.ibermatica.oralockbg.service.ObjectTypeService;

@Service
public class ObjectTypeServiceImpl implements ObjectTypeService {
	
	@Autowired
	private ObjectTypeRepository objectTypeRepository;
	
	@Autowired
	private ObjectTypeMapper objectTypeMapper;
	
	@Override
	public List<ObjectTypeDto> getAll() {
		Sort sort = new Sort("order");
		Iterable<ObjectType> iterable = objectTypeRepository.findAll(sort);
		return objectTypeMapper.toDtoList( StreamSupport
				  .stream(iterable.spliterator(), false)
				  .collect(Collectors.toList()) );
	}

}
