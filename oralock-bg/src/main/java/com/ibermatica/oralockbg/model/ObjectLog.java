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

import org.hibernate.annotations.Formula;

import lombok.Data;

@Entity
@Table(schema="oob", name="oobl_log")
@Data
public class ObjectLog implements Serializable {

	private static final long serialVersionUID = -5115567838832915392L;

	@Id
	@GeneratedValue(generator="log_seq")
	@SequenceGenerator(name="log_seq", schema="oob", sequenceName="oobl_log_seq", allocationSize=1)	
	@Column(name="ol_id", nullable = false)
	private Integer id;
	
	@Column(name="ol_type", nullable = false)
	private String type;
	
	@Column(name="ol_owner", nullable = false)
	private String owner;	

	@Column(name="ol_name", nullable = false)
	private String name;	
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ol_op", insertable = false, updatable = false)	
	private Operation op;	
    
	@Column(name="ol_op", nullable = false)
	private String idOperation;    
	
	@Column(name="ol_user", nullable = false)
	private String user;	
	
	@Formula("(select u.ou_name from oob.oobl_user u where u.ou_id=ol_user)")
	private String username;
	
	@Column(name="ol_ref")
	private String ref;		
	
	@Column(name="ol_date")
	private Date date;
	
	@Column(name="ol_comment")
	private String comment;		
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ol_type", insertable=false, updatable = false)
	private ObjectType objectType;	
    
}
 
