package com.ibermatica.oralockbg.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ibermatica.oralockbg.dto.UserDto;
import com.ibermatica.oralockbg.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

	@Mapping(source = "roleClass.label", target = "roleLabel")
	@Mapping(source = "roleClass.admin", target = "roleAdmin")
	UserDto toDto(User user);
	
	@Mapping(source = "role", target = "roleClass.id")
	@Mapping(source = "roleLabel", target = "roleClass.label")
	@Mapping(source = "roleAdmin", target = "roleClass.admin")	
	User toEntity(UserDto user);

	List<UserDto> toDtoList(List<User> list);
	
}
