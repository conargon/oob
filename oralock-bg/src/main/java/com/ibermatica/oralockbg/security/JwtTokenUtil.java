package com.ibermatica.oralockbg.security;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ibermatica.oralockbg.controller.AuthenticateController;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
 
@Component
public class JwtTokenUtil {
	
    //private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hour
	
	private Logger logger = LoggerFactory.getLogger(AuthenticateController.class);
    
    @Value("${app.jwt.secret}")
    private String SECRET_KEY;
     
    private String createToken(UserDetails userDetails, boolean refreshToken) {
    	Date expiration = refreshToken 
    			? toDate(LocalDateTime.now().plusHours(24)) // 24 horas
    					: toDate(LocalDateTime.now().plusMinutes(5)); // 5 minutos
    	Optional<? extends GrantedAuthority> grantedAuthority = userDetails.getAuthorities().stream().findFirst();
    	String role = grantedAuthority.isPresent() ? grantedAuthority.get().getAuthority() : "";
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuer(role)
                .setIssuedAt(new Date())
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
                 
    }
    
    private static Date toDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }    
    
    public String generateToken(UserDetails userDetails) {
    	return createToken(userDetails, false);
    }
    
    public String generateRefreshToken(UserDetails userDetails) {
    	return createToken(userDetails, true);
    }    
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    	final Claims claims = extractAllClaims(token);
    	return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
    	return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }
    
    public Date extractExpiration(String token) {
    	return extractClaim(token, Claims::getExpiration);
    }
    
    public Boolean isTokenExpired(String token) {
    	return extractExpiration(token).before(new Date());
    }
    
    public String extractUsername(String token) {
    	return extractClaim(token, Claims::getSubject);
    }
    
    public String extractRole(String token) {
    	return extractClaim(token, Claims::getIssuer);
    }    
    
    public Boolean validateToken(String token, UserDetails userDetails) {
    	final String username = extractUsername(token);
    	return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }    
    
    public boolean validateJwtToken(String authToken) {
        try {
          Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(authToken);
          return true;
        } catch (SignatureException e) {
          logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
          logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
          logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
          logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
          logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
     }    
}
