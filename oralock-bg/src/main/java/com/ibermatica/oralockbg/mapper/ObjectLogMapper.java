package com.ibermatica.oralockbg.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ibermatica.oralockbg.dto.ObjectLogDto;
import com.ibermatica.oralockbg.model.ObjectLog;

@Mapper(componentModel = "spring")
public interface ObjectLogMapper {

	@Mapping(source = "op.id", target = "op")
	@Mapping(source = "op.name", target = "opLabel")
	@Mapping(source = "objectType.label", target = "label")
	ObjectLogDto toDto(ObjectLog objectLogDto);

	List<ObjectLogDto> toDtoList(List<ObjectLog> list);
	
}
