package com.ibermatica.oralockbg.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.dto.OracleObjectDto;
import com.ibermatica.oralockbg.mapper.OracleObjectMapper;
import com.ibermatica.oralockbg.repository.OracleObjectRepository;
import com.ibermatica.oralockbg.service.OracleObjectService;

@Service
public class OracleObjectServiceImpl implements OracleObjectService {
	
	@Autowired
	private OracleObjectRepository oracleObjectRepository;
	
	@Autowired
	private OracleObjectMapper oracleObjectMapper;
	
	@Override
	public List<OracleObjectDto> find(String owner, String type, String name, String user, String sort, String dir) {
		return oracleObjectMapper.toDtoList( oracleObjectRepository.find(owner, type, name, user, sort, dir) );
	}

}
