package com.ibermatica.oralockbg.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObjectLogDto {

	private Integer id;
	
	private String type;
	
	private String owner;	

	private String name;	
	
	private String op;
	
	private String opLabel;
	
	private String user;	
	
	private String username;
	
	private String ref;
	
	private Date date;
	
	private String comment;			
	
	private String label;
	
}
