package com.flyhigh;

import jakarta.persistence.*;

@Entity
public class Flight {
    @Id
    @SequenceGenerator(name = "flight_id_seq", sequenceName = "flight_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "flight_id_seq")
    private Integer id;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String start;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = true)
    private String via;

    @Column(nullable = false)
    private Integer seats;

    @Column(nullable = false)
    private Double cost;

    @Column(nullable = true)
    private String travelTime;

    @Column(nullable = false)
    private Double updatedCost;

    public Flight() {
    }

    public Flight(Integer id, String name, String start, String dest, String via, Integer seats, Double cost,
            String time) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.destination = dest;
        this.via = via;
        this.seats = seats;
        this.cost = cost;
        this.travelTime = time;
        this.updatedCost = cost;
    }

    public Flight(Integer id, String name, String start, String dest, Integer seats, Double cost, String time) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.destination = dest;
        this.seats = seats;
        this.cost = cost;
        this.travelTime = time;
        this.updatedCost = cost;
    }

    public Integer getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getStart() {
        return this.start;
    }

    public String getDestination() {
        return this.destination;
    }

    public String getVia() {
        return this.via;
    }

    public Integer getSeats() {
        return this.seats;
    }

    public Double getCost() {
        return this.cost;
    }

    public String getTime() {
        return this.travelTime;
    }

    public Double getUpdatedCost() {
        return this.updatedCost;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public void setDest(String dest) {
        this.destination = dest;
    }

    public void setVia(String via) {
        this.via = via;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public void setTime(String time) {
        this.travelTime = time;
    }

    public void setUpdatedCost(Double updatedCost) {
        this.updatedCost = updatedCost;
    }

    @Override
    public String toString() {
        return "Flight: [ID:" + this.id + ", Name:" + this.name + ", Start:" + this.start + ", Dest.:"
                + this.destination + ", Via:" + this.via + ", Cost:" + this.cost + ", Seats:" + this.seats
                + ", Travel time:" + this.travelTime + "]";
    }

}
