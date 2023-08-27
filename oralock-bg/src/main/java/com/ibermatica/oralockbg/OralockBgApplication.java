package com.ibermatica.oralockbg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication(exclude = SpringDataWebAutoConfiguration.class)
@EnableCaching
@EnableSpringDataWebSupport
public class OralockBgApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(OralockBgApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(OralockBgApplication.class);
	}

}
