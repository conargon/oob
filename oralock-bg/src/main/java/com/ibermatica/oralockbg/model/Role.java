package com.ibermatica.oralockbg.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ibermatica.oralockbg.converter.PrimitiveBooleanToNumberConverter;

import lombok.Data;

@Entity
@Table(schema="oob", name="oobl_role")
@Data
public class Role implements Serializable {

	private static final long serialVersionUID = 5215310733682462352L;

	@Id
	@Column(name="or_id")
	private String id;
	
	@Column(name="or_label")
	private String label;		
	
	@Column(name="or_admin")
	@Convert(converter = PrimitiveBooleanToNumberConverter.class)
	private Boolean admin;		
	
}
