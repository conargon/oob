package com.ibermatica.oralockbg.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.ibermatica.oralockbg.dto.OracleObjectDto;
import com.ibermatica.oralockbg.model.Lock;
import com.ibermatica.oralockbg.model.OracleObject;

@Mapper(componentModel = "spring", uses = {LockMapper.class})
public interface OracleObjectMapper {

	@Mapping(source = "objectType.label", target = "label")
	@Mapping(source = "objectType.icon", target = "icon")
	@Mapping(source = "lock", target = "isBlocked", qualifiedByName = "checkBlocked")
	OracleObjectDto toDto(OracleObject oracleObject);

	List<OracleObjectDto> toDtoList(List<OracleObject> list);

	@Named("checkBlocked")
	default Boolean checkBlocked(Lock lock) {
		return lock != null && lock.getId() != -1;
	}
}
