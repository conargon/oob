package com.ibermatica.oralockbg.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.dto.TranslationDto;
import com.ibermatica.oralockbg.mapper.TranslationMapper;
import com.ibermatica.oralockbg.repository.TranslationRepository;
import com.ibermatica.oralockbg.service.TranslationService;

@Service
public class TranslationServiceImpl implements TranslationService {
	
	@Autowired
	private TranslationRepository translationRepository;
	
	@Autowired
	private TranslationMapper translationMapper;	

	@Override
	public List<TranslationDto> getTranslationList(String lang) {
		return translationMapper.toDtoList( translationRepository.getByTranslationPkLang(lang) );
	}

}
