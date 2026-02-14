package com.acl.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // In production, you would typically read this from an environment variable allowedOrigin
                String allowedOrigin = System.getenv("ALLOWED_ORIGIN");
                if (allowedOrigin == null || allowedOrigin.isEmpty()) {
                    allowedOrigin = "*"; // Or keep localhost for dev safety
                }

                registry.addMapping("/**") // Changed to /** to cover all
                        .allowedOrigins("*") // Allowing all for simplicity in this deployment demo, CHANGE FOR PROD
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false); // Credentials false if using *
            }
        };
    }
}
