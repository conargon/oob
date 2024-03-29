package com.ibermatica.oralockbg.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class PrimitiveBooleanToNumberConverter implements AttributeConverter<Boolean, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Boolean value) {
        return (value != null && value) ? 1 : 0;
    }    

    @Override
    public Boolean convertToEntityAttribute(Integer value) {
        return Integer.valueOf(1).equals(value);
    }
}