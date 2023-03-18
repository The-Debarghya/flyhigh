package com.flyhigh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.graphql.data.method.annotation.*;
import java.util.*;
import java.util.stream.Stream;

@Controller
public class QueryResolver {
    @Autowired
    private FlightRepository flightRepository;

    @QueryMapping
    public List<Flight> flights() {
        return flightRepository.findAll();
    }

    @QueryMapping
    public Flight flight(@Argument Integer id) {
        return flightRepository.findById(id).orElse(null);
    }

    @QueryMapping
    public List<Flight> flightsByStart(@Argument String start) {
        return flightRepository.findByStart(start);
    }

    @QueryMapping
    public List<Flight> flightsByDest(@Argument String destination) {
        return flightRepository.findByDestination(destination); 
    }

    @QueryMapping
    public List<Flight> flightsByStartAndDest(@Argument String start, @Argument String destination) {
        List<Flight> list1 = flightRepository.findByStartAndDestination(start, destination);
        List<Flight> list2 = flightRepository.findByStartAndVia(start, destination);
        List<Flight> list3 = flightRepository.findByViaAndDestination(start, destination);
        return Stream.of(list1, list2, list3).flatMap(Collection::stream).toList();
    }
}
