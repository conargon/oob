package com.ibermatica.oralockbg.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OracleObjectDto {

	private Integer id;
	
	private String owner;
	
	private String name;
	
	private String type;
	
	private String label;
	
	private String icon;
	
	private Boolean isBlocked;
	
	private LockDto lock;
	
}
