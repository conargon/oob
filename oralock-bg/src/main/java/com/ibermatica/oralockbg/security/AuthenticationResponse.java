package com.ibermatica.oralockbg.security;
import java.io.Serializable;

import com.ibermatica.oralockbg.dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse implements Serializable {
	private static final long serialVersionUID = 7569887378221441369L;
	private String token;
	private String refreshToken;
	private UserDto user;
}
