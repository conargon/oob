package com.ibermatica.oralockbg.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(schema="oob", name="oobl_option")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Option implements Serializable {
	
	private static final long serialVersionUID = -4821799599314800522L;

	@Id
	@Column(name="op_id")
	private String id;	
	
	@Column(name="op_value")
	private String value;	

}
