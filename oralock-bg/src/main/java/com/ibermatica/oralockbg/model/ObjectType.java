package com.ibermatica.oralockbg.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

import com.ibermatica.oralockbg.converter.PrimitiveBooleanToNumberConverter;

import lombok.Data;

@Entity
@Table(schema="oob", name="oobl_object")
@Data
public class ObjectType implements Serializable {

	private static final long serialVersionUID = -6080997323247167637L;

	@Id
	@Column(name="oo_id")
	private String id;
	
	@Column(name="oo_class")
	private String classType;
	
	@Column(name="oo_label")
	private String label;
	
	@Column(name="oo_order")
	private Integer order;
	
	@Column(name="oo_icon")
	private String icon;
	
	@Column(name="oo_active")
	@Convert(converter = PrimitiveBooleanToNumberConverter.class)
	private Boolean active;	
	
	@Formula("(select count(*) from oob.oobl_block b where b.ob_type=oo_id)")
	private Integer countLocks;

}
