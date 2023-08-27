package com.ibermatica.oralockbg.model;


import java.io.Serializable;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

import com.ibermatica.oralockbg.converter.PrimitiveBooleanToNumberConverter;

import lombok.Data;

@Entity
@Table(name="all_users")
@Data
public class Schema implements Serializable {

	private static final long serialVersionUID = 193934893472683791L;
	
	@Id
	private String username;
	
	@Formula("(select count(*) from oob.oobl_schema os where os.os_schema=username)")
	@Convert(converter = PrimitiveBooleanToNumberConverter.class)
	private Boolean isRegistered;
	
	@Formula("(select count(*) from oob.oobl_block b where b.ob_owner=username)")
	private Integer countLocks;	
	
}
