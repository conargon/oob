package com.ibermatica.oralockbg.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.model.RegisteredSchema;
import com.ibermatica.oralockbg.repository.RegisteredSchemaRepository;
import com.ibermatica.oralockbg.service.RegisteredSchemaService;

@Service
public class RegisteredSchemaServiceImpl implements RegisteredSchemaService {

	@Autowired
	private RegisteredSchemaRepository registeredSchemaRepository;

	@Override
	public List<RegisteredSchema> getList() {
		Iterable<RegisteredSchema> iterable = registeredSchemaRepository.findAll();
		return StreamSupport.stream(iterable.spliterator(), false).collect(Collectors.toList());
	}

}
