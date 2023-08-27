package com.ibermatica.oralockbg.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ibermatica.oralockbg.dto.TranslationDto;
import com.ibermatica.oralockbg.model.Translation;

@Mapper(componentModel = "spring")
public interface TranslationMapper {
	
	@Mapping(source = "translationPk.id", target = "id")
	@Mapping(source = "translationPk.lang", target = "lang")
	TranslationDto toDto(Translation translation);
	
	List<TranslationDto> toDtoList(List<Translation> list);
}
