package com.ibermatica.oralockbg.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ibermatica.oralockbg.dto.LockDto;
import com.ibermatica.oralockbg.model.Lock;

@Mapper(componentModel = "spring")
public interface LockMapper {

	@Mapping(source = "objectType.label", target = "label")
	@Mapping(source = "objectType.icon", target = "icon")
	LockDto toDto(Lock lock);
	
	List<LockDto> toDtoList(List<Lock> list);
	
}
