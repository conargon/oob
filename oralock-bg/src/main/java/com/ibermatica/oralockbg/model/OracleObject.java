package com.ibermatica.oralockbg.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.Data;

@Entity
@Table(name="dba_objects")
@Where(clause = "object_type in (select ot.oo_id from oob.oobl_object ot where ot.oo_active=1)")
@Data
public class OracleObject implements Serializable {

	private static final long serialVersionUID = 5032077865603941883L;

	@Id
	@Column(name="object_id")
	private Integer id;
	
	@Column(name="owner")
	private String owner;
	
	@Column(name="object_name")
	private String name;
	
	@Column(name="object_type")
	private String type;		
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "object_type", insertable = false, updatable = false)
	private ObjectType objectType;		
	
    @OneToOne
    @JoinColumns(
    {
        @JoinColumn(updatable=false,insertable=false, name="object_type", referencedColumnName="ob_type"),
        @JoinColumn(updatable=false,insertable=false, name="owner", referencedColumnName="ob_owner"),
        @JoinColumn(updatable=false,insertable=false, name="object_name", referencedColumnName="ob_name")
    }
    )
	private Lock lock;

}

