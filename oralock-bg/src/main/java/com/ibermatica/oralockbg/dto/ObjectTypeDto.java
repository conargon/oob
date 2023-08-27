package com.ibermatica.oralockbg.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObjectTypeDto {
	
	private String id;
	
	private String classType;
	
	private String label;
	
	private Integer order;
	
	private String icon;
	
	private Boolean active;	
	
	private Integer countLocks;
	
}
