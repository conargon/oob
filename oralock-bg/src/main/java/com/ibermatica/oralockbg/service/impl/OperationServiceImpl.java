package com.ibermatica.oralockbg.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.model.Operation;
import com.ibermatica.oralockbg.repository.OperationRepository;
import com.ibermatica.oralockbg.service.OperationService;

@Service
public class OperationServiceImpl implements OperationService {
	
	@Autowired
	private OperationRepository operationRepository;	

	@Override
	public List<Operation> list() {
		Iterable<Operation> iterable = operationRepository.findAll();
		return StreamSupport
				  .stream(iterable.spliterator(), false)
				  .collect(Collectors.toList());
	}
}
