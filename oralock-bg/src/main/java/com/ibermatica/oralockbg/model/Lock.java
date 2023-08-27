package com.ibermatica.oralockbg.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Formula;

import lombok.Data;

@Entity
@Table(schema="oob", name="oobl_block", uniqueConstraints = { @UniqueConstraint(name = "oobl_block_uk", columnNames = { "ob_type", "ob_owner", "ob_name" })})
@Data
public class Lock implements Serializable {

	private static final long serialVersionUID = -6997668737489914202L;

	@Id
	@GeneratedValue(generator="block_seq")
	@SequenceGenerator(name="block_seq", schema="oob", sequenceName="oobl_block_seq", allocationSize=1)	
	@Column(name="ob_id",  nullable = false)
	private Integer id;
	
	@Column(name="ob_type", nullable = false)
	private String type;
	
	@Column(name="ob_owner", nullable = false)
	private String owner;
	
	@Column(name="ob_name", nullable = false)
	private String name;
	
	@Column(name="ob_user", nullable = false)
	private String user;
	
	@Formula("(select u.ou_name from oob.oobl_user u where u.ou_id=ob_user)")
	private String username;	
	
	@Column(name="ob_ref")
	private String ref;	
	
	@Column(name="ob_comment", nullable = false)
	private String comment;
	
	@Column(name="ob_date", nullable = false)
	private Date date;		
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ob_type", insertable = false, updatable = false)
	private ObjectType objectType;		
	
}
