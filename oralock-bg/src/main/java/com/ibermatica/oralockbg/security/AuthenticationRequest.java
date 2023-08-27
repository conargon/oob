package com.ibermatica.oralockbg.security;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest implements Serializable {
	private static final long serialVersionUID = -214691483467134128L;
	private String username;
	private String password;
}
