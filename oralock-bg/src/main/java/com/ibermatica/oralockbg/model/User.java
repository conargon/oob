package com.ibermatica.oralockbg.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

import lombok.Data;

@Entity
@Table(schema="oob", name="oobl_user")
@Data
public class User implements Serializable {

	private static final long serialVersionUID = -4433332553060734057L;

	@Id
	@Column(name="ou_id")
	private String id;
	
	@Column(name="ou_name")
	private String name;
	
	@Column(name="ou_email")
	private String email;
	
	@Column(name="ou_enabled")
	private Date enabled;
	
	@Column(name="ou_disabled")
	private Date disabled;
	
	@Column(name="ou_role")
	private String role;
	
	@Column(name="ou_lang")
	private String lang;		
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ou_role", insertable = false, updatable = false)
	private Role roleClass;
    
    @Formula("(select count(*) from oob.oobl_block b where b.ob_user=ou_id)")
    private Integer countLocks;
	
}
