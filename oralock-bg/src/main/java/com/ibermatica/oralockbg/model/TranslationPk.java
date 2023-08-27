package com.ibermatica.oralockbg.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor 
public class TranslationPk implements Serializable {

	private static final long serialVersionUID = 6244282554644870069L;

	@Column(name="ot_id")
	private String id;	
	
	@Column(name="ot_lang")
	private String lang;	
	
}
