package com.ibermatica.oralockbg.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TranslationDto {
	
	private String id;	
	
	private String lang;	
	
	private String text;	
	
	private String textPlural;	
}
