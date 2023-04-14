package com.flyhigh;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface FlightRepository extends JpaRepository<Flight, Integer> {
    List<Flight> findByStart(String start);
    List<Flight> findByDestination(String dest);
    List<Flight> findByStartAndDestination(String start, String destination);
    List<Flight> findByStartAndVia(String start, String via);
    List<Flight> findByViaAndDestination(String via, String destination);
    List<Flight> findByCostLessThanEqual(Double cost);

    @Modifying
    @Query("UPDATE Flight f SET f.updatedCost = f.cost WHERE f.cost != f.updatedCost")
    void updateUpdatedCost();

    @Modifying
    @Query("UPDATE Flight f SET f.updatedCost = :newCost WHERE f.name = :name")
    void updateUpdatedCostByName(@Param("name") String name, @Param("newCost") Double newCost);
}
