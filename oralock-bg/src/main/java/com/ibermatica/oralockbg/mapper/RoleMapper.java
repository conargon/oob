package com.ibermatica.oralockbg.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.ibermatica.oralockbg.dto.RoleDto;
import com.ibermatica.oralockbg.model.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {

	RoleDto toDto(Role role);

	List<RoleDto> toDtoList(List<Role> list);
	
}
