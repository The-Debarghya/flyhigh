package com.flyhigh;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/graphql")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("POST") // Allow only POST method
                .allowedHeaders("*") // Allow any headers
                .allowCredentials(true); // Allow sending credentials (e.g., cookies)

        registry.addMapping("/api/auth/authenticate")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("POST") // Allow only POST method
                .allowedHeaders("*") // Allow any headers
                .allowCredentials(true); // Allow sending credentials (e.g., cookies)
        
        registry.addMapping("/sms/send")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("POST") // Allow only POST method
                .allowedHeaders("*") // Allow any headers
                .allowCredentials(true); // Allow sending credentials (e.g., cookies)
    }
}
