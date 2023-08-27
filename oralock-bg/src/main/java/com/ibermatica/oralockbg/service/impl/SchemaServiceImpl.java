package com.ibermatica.oralockbg.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.model.Schema;
import com.ibermatica.oralockbg.repository.SchemaRepository;
import com.ibermatica.oralockbg.service.SchemaService;

@Service
public class SchemaServiceImpl implements SchemaService {
	
	@Autowired
	private SchemaRepository schemaRepository;	

	@Override
	public List<Schema> getAll() {
		Sort sort = new Sort("username");
		Iterable<Schema> iterable = schemaRepository.findAll(sort);
		return StreamSupport
				  .stream(iterable.spliterator(), false)
				  .collect(Collectors.toList());
	}

}
