import Flight from "@/components/flight";
import Header from "@/components/header";
import OffersTab from "@/components/offers";
import axios from "axios";
import { useRef, useState } from "react";
import { API_BASE_URL } from "@/config/route";
import ChatBot from "@/components/chatbot";

export default function Home() {

  const [flights, setFlights] = useState([])
  const dataRef = useRef({
    "departure": "",
    "destination": "",
    "via": "",
    "maxCost": ""
  });

  async function searchFlights() {
    dataRef.current.maxCost = parseInt(dataRef.current.maxCost);
    let requestBody, flag;
    const headers = {
      'content-type': 'application/json'
    };
    if (dataRef.current.departure != "" && dataRef.current.destination != "") {
      const start = dataRef.current.departure
      const destination = dataRef.current.destination
      requestBody = {
        query: `query flightsByStartAndDest($start: String!, $destination: String!){
                  flightsByStartAndDest(start:$start, destination:$destination){
                      start
                      destination
                      cost
                      via
                      seats
                      name
                      travelTime
                      updatedCost
                  }
                }`,
        variables: { start, destination }
      };
      flag = 1
    } else if (dataRef.current.departure != "" && dataRef.current.destination == "") {
      const start = dataRef.current.departure
      requestBody = {
        query: `query flightsByStart($start: String!){
                  flightsByStart(start:$start){
                      start
                      destination
                      cost
                      via
                      seats
                      name
                      travelTime
                      updatedCost
                  }
                }`,
        variables: { start }
      };
      flag = 2
    } else if (dataRef.current.departure == "" && dataRef.current.destination != "") {
      const destination = dataRef.current.destination
      requestBody = {
        query: `query flightsByDest($destination: String!){
                  flightsByDest(destination:$destination){
                      start
                      destination
                      cost
                      via
                      seats
                      name
                      travelTime
                      updatedCost
                  }
                }`,
        variables: { destination }
      };
      flag = 3
    }

    const options = {
      method: 'POST',
      url: API_BASE_URL + '/graphql',
      headers,
      data: requestBody
    };
    const response = await axios(options);
    switch (flag) {
      case 1:
        setFlights(response.data.data.flightsByStartAndDest);
        break;
      case 2:
        setFlights(response.data.data.flightsByStart);
        break;
      case 3:
        setFlights(response.data.data.flightsByDest);
        break;
      default:
        break;
    }
  }

  return (
    <div className="p-8">

      <Header dataRef={dataRef} searchFlights={searchFlights} />
      <OffersTab />
      <div className="flex flex-col gap-5">
        {flights.map((flight) => {
          return (<Flight props={flight} />)
        })}

        <ChatBot />

      </div>


    </div>);
}