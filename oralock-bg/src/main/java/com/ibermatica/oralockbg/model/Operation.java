package com.ibermatica.oralockbg.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(schema="oob", name="oobl_op")
@Data
public class Operation implements Serializable {

	private static final long serialVersionUID = -5548420296796792169L;

	@Id
	@Column(name="op_id")
	private String id;	
	
	@Column(name="op_name")
	private String name;	
	
}
