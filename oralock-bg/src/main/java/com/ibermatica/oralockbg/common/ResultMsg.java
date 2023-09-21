package com.ibermatica.oralockbg.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResultMsg {

	private boolean result;
	private String msg;
	
	public ResultMsg(boolean b) {
		result=b;
	}
	
	public boolean isOk() {
		return result;
	}
	
	public boolean isError() {
		return !result;
	}
}
