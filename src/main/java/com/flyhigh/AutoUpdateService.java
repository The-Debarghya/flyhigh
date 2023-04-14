package com.flyhigh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AutoUpdateService {
    @Autowired
    private FlightRepository flightRepository;

    @Scheduled(fixedRate = 86400000)
    @Transactional
    public void updateFlightCost() {
        System.out.println("Scheduled Updating of Cost!");
        flightRepository.updateUpdatedCost();
    }
}
