package com.ibermatica.oralockbg.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	
	private String id;
	
	private String name;
	
	private String email;
	
	private Date enabled;
	
	private Date disabled;
	
	private String role;
	
	private String lang;
	
	private String roleLabel;
	
	private Boolean roleAdmin;
	
	private Integer countLocks;
	
}
