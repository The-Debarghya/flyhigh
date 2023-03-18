package com.flyhigh;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface FlightRepository extends JpaRepository<Flight, Integer> {
    List<Flight> findByStart(String start);
    List<Flight> findByDestination(String dest);
    List<Flight> findByStartAndDestination(String start, String destination);
    List<Flight> findByStartAndVia(String start, String via);
    List<Flight> findByViaAndDestination(String via, String destination);
}
