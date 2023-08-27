package com.ibermatica.oralockbg.dto;

import java.util.List;

import com.ibermatica.oralockbg.model.Option;

import lombok.Data;

@Data
public class OptionsDTO {

	private List<String> schemas;
	
	private List<String> types;
	
	private List<Option> options;
	
}
