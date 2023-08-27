package com.ibermatica.oralockbg.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
	
	private String id;
	
	private String label;		
	
	private Boolean admin;	
	
}
