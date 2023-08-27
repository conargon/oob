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
@Table(schema="oob", name="oobl_schema")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisteredSchema implements Serializable {

	private static final long serialVersionUID = -2578307285874725364L;
	
	@Id
	@Column(name="os_schema")
	private String id;	

}
