package com.ibermatica.oralockbg.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.ibermatica.oralockbg.dto.ObjectTypeDto;
import com.ibermatica.oralockbg.model.ObjectType;

@Mapper(componentModel = "spring")
public interface ObjectTypeMapper {
	
	ObjectTypeDto toDto(ObjectType bjectType);

	List<ObjectTypeDto> toDtoList(List<ObjectType> list);
}
