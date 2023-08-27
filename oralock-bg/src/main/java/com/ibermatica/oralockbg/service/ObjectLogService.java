package com.ibermatica.oralockbg.service;

import java.util.List;

import com.ibermatica.oralockbg.dto.ObjectLogDto;

public interface ObjectLogService {
	List<ObjectLogDto> find(String owner, String type, String name, String sort, String dir);
}
