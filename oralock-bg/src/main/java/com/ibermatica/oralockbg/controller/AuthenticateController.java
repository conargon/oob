package com.ibermatica.oralockbg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ibermatica.oralockbg.dto.UserDto;
import com.ibermatica.oralockbg.security.AuthenticationRequest;
import com.ibermatica.oralockbg.security.AuthenticationResponse;
import com.ibermatica.oralockbg.security.JwtTokenUtil;
import com.ibermatica.oralockbg.security.UserPrincipal;
import com.ibermatica.oralockbg.service.AuthenticateService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/olc/api/v1.0")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticateController {
	
	//@Autowired
	private final JwtTokenUtil jwtTokenUtil;	
	
	@Autowired
	private final AuthenticateService authenticateService;	
	
	@PostMapping("/login")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest r) {
		
		UserDto user = authenticateService.authenticate(r.getUsername(), r.getPassword());
		
		UserPrincipal u = new UserPrincipal(r.getUsername(), r.getPassword(), user.getRole());
		String token = jwtTokenUtil.generateToken(u);
		String refreshToken = jwtTokenUtil.generateRefreshToken(u);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(new AuthenticationResponse(token, refreshToken, user));
	}

	@PostMapping("/refreshtoken")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<AuthenticationResponse> refreshToken(@RequestBody String refreshToken) {			
		if(jwtTokenUtil.validateJwtToken(refreshToken)) {
			String username = jwtTokenUtil.extractUsername(refreshToken);
			UserPrincipal u = new UserPrincipal(username, "", "");
			String token = jwtTokenUtil.generateToken(u);		
			return ResponseEntity.status(HttpStatus.CREATED).body(new AuthenticationResponse(token, refreshToken, null));
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthenticationResponse(null, null, null));
		}
	}
	
	

}
