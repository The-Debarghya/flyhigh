package com.flyhigh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.graphql.data.method.annotation.*;
import org.springframework.security.access.annotation.Secured;

import java.util.*;
import java.util.stream.Stream;

@Controller
public class QueryResolver {
    @Autowired
    private FlightRepository flightRepository;

    @Secured("ROLE_USER")
    @QueryMapping(name = "flights")
    public List<Flight> flights() {
        return flightRepository.findAll();
    }

    @Secured("ROLE_USER")
    @QueryMapping(name = "flight")
    public Flight flight(@Argument Integer id) {
        return flightRepository.findById(id).orElse(null);
    }

    @Secured("ROLE_USER")
    @QueryMapping
    public List<Flight> flightsByStart(@Argument String start) {
        return flightRepository.findByStart(start);
    }

    @Secured("ROLE_USER")
    @QueryMapping
    public List<Flight> flightsByDest(@Argument String destination) {
        return flightRepository.findByDestination(destination); 
    }

    @Secured("ROLE_USER")
    @QueryMapping
    public List<Flight> flightsByStartAndDest(@Argument String start, @Argument String destination) {
        List<Flight> list1 = flightRepository.findByStartAndDestination(start, destination);
        List<Flight> list2 = flightRepository.findByStartAndVia(start, destination);
        List<Flight> list3 = flightRepository.findByViaAndDestination(start, destination);
        return Stream.of(list1, list2, list3).flatMap(Collection::stream).toList();
    }
}
