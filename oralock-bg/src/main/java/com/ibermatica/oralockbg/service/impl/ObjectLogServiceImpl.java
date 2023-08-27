package com.ibermatica.oralockbg.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.dto.ObjectLogDto;
import com.ibermatica.oralockbg.mapper.ObjectLogMapper;
import com.ibermatica.oralockbg.repository.ObjectLogRepository;
import com.ibermatica.oralockbg.service.ObjectLogService;

@Service
public class ObjectLogServiceImpl implements ObjectLogService {

	@Autowired
	private ObjectLogRepository objectLogRepository;
	
	@Autowired
	private ObjectLogMapper objectLogMapper;
	
	@Override
	public List<ObjectLogDto> find(String owner, String type, String name, String sort, String dir) {
		return objectLogMapper.toDtoList( objectLogRepository.find(owner, type, name, sort, dir) );
	}

}
