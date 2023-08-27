package com.ibermatica.oralockbg.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LockDto {
	
	private Integer id;
	
	private String type;
	
	private String owner;
	
	private String name;
	
	private String user;
	
	private String username;
	
	private String ref;
	
	private String comment;
	
	private Date date;	
	
	private String label;
	
	private String icon;
	
}
