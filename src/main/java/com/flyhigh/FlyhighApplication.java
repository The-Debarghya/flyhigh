package com.flyhigh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FlyhighApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlyhighApplication.class, args);
	}

}
