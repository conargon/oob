package com.ibermatica.oralockbg.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

	private final JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String header = request.getHeader("Authorization");
		final String username;
		final String role;
		final String token;
		if (header != null && header.startsWith("Bearer ")) {
			token = header.substring(7);
			if (jwtTokenUtil.validateJwtToken(token)) {
				username = jwtTokenUtil.extractUsername(token);
				role = jwtTokenUtil.extractRole(token);
				if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
					UserPrincipal u = new UserPrincipal();
					u.setUsername(username);
					u.setRole(role);
					UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(u, null,
							u.getAuthorities());
					upat.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(upat);
				}
			}
		}
		filterChain.doFilter(request, response);
	}

}
