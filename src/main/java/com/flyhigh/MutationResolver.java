package com.flyhigh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/graphiql")
public class MutationResolver {
    @Autowired
    private FlightRepository flightRepository;

    @MutationMapping
    public Flight addFlight(
        @Argument String name, 
        @Argument String start, 
        @Argument String destination, 
        @Argument String via, 
        @Argument Double cost, 
        @Argument Integer seats, 
        @Argument String expectedTravelTime 
    ) {
        if(expectedTravelTime == null) {
            expectedTravelTime = "";
        }
        Integer id = Math.toIntExact(flightRepository.count()) + 1;
        Flight flight = new Flight(id, name, start, destination, seats, cost, expectedTravelTime);
        try{
            flightRepository.save(flight);
            return flight;
        }catch(Exception e) {
            e.printStackTrace();
            return new Flight();
        }
    }

    @MutationMapping
    public Boolean updateCost(@Argument Integer id, @Argument Double cost) {
        try {
            Flight flight = flightRepository.findById(id).orElse(null);
            if (flight == null) {
                throw new Exception();
            }
            flight.setCost(cost);
            flightRepository.save(flight);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @MutationMapping
    public Boolean updateSeats(@Argument Integer id, @Argument Integer seats) {
        try {
            Flight flight = flightRepository.findById(id).orElse(null);
            if (flight == null) {
                throw new Exception();
            }
            flight.setSeats(seats);
            flightRepository.save(flight);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @MutationMapping
    public Boolean updateVia(@Argument Integer id, @Argument String via) {
        try {
            Flight flight = flightRepository.findById(id).orElse(null);
            if (flight == null) {
                throw new Exception();
            }
            flight.setVia(via);
            flightRepository.save(flight);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
