package com.ibermatica.oralockbg.service;

import java.util.List;

import com.ibermatica.oralockbg.dto.TranslationDto;

public interface TranslationService {

	List<TranslationDto> getTranslationList(String lang);

}
