package com.ibermatica.oralockbg.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ibermatica.oralockbg.model.Translation;
import com.ibermatica.oralockbg.model.TranslationPk;

@Repository
public interface TranslationRepository extends CrudRepository<Translation, TranslationPk> {

	List<Translation> getByTranslationPkLang(String lang);
}
