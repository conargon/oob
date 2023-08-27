package com.ibermatica.oralockbg.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(schema="oob", name="oobl_translation")
@Data
public class Translation implements Serializable {
	
	private static final long serialVersionUID = 3328389930586890240L;
	
	@Id
	private TranslationPk translationPk;
	
	@Column(name="ot_text")
	private String text;	
	
	@Column(name="ot_text_p")
	private String textPlural;	

}
