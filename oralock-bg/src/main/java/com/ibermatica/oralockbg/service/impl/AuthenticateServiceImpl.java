package com.ibermatica.oralockbg.service.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ibermatica.oralockbg.dto.UserDto;
import com.ibermatica.oralockbg.mapper.UserMapper;
import com.ibermatica.oralockbg.model.User;
import com.ibermatica.oralockbg.repository.UserRepository;
import com.ibermatica.oralockbg.security.JwtTokenUtil;
import com.ibermatica.oralockbg.security.UserPrincipal;
import com.ibermatica.oralockbg.service.AuthenticateService;

@Service
public class AuthenticateServiceImpl implements AuthenticateService {

	@Value("${spring.datasource.url}")
	private String url;

	@Value("${spring.datasource.driver-class-name}")
	private String driver;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	public UserDto authenticate(String username, String password) {
		if (!testConnection(username, password)) {
			throw new BadCredentialsException("Unauthorizated");
		}
		User u = userRepository.findOne(username.toUpperCase());
		if (u == null) {
			throw new BadCredentialsException("Unauthorizated");
		}
		if (u.getDisabled() != null) {
			throw new BadCredentialsException("Unauthorizated");
		}
		return userMapper.toDto(u);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserPrincipal u = new UserPrincipal();
		u.setUsername(username);
		return u;
	}

	private boolean testConnection(String username, String password) {
		try {
			Class.forName(driver);
			Connection con = DriverManager.getConnection(url, username, password);
			String query = "select 1 from dual";
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(query);
			rs.close();
			st.close();
			con.close();
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public User getCurrentUser(String authorization) {
		String username = getUserName(getToken(authorization));
		return userRepository.findOne(username);
	}
	
	@Override
	public String getCurrentRole(String authorization) {
		return jwtTokenUtil.extractRole(getToken(authorization));
	}

	private String getUserName(String token) {
		String user = jwtTokenUtil.extractUsername(token);
		return user != null ? user.toUpperCase() : "";
	}

	private String getToken(String authorization) {
		return authorization != null ? authorization.substring(7) : "";
	}	

}
