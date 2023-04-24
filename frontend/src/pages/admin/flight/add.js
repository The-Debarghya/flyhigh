import Navbar from "@/components/navbar";
import { API_BASE_URL } from "@/config/route";
import axios from 'axios'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function AddFlight() {
    const router = useRouter();

    const [start, setStart] = useState("")
    const [destination, setDestination] = useState("")
    const [via, setVia] = useState("")
    const [travelTime, setTravelTime] = useState("")
    const [cost, setCost] = useState("")
    const [seats, setSeats] = useState("")
    const [name, setName] = useState("")



    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage

        // If JWT token is not present, redirect to login page
        if (!jwtToken) {
            router.push('/admin/login');
        }
    }, []);

    async function handleSubmit() {
        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        };
        let requestBody = {
            query: `mutation{
                      addFlight(name:"${name}", start:"${start}", destination:"${destination}", via:"${via}", cost:${parseFloat(cost)}, seats:${parseInt(seats)}, travelTime:"${travelTime}"){
                        id
                        name
                      }
                    }`
        };
        const options = {
            method: 'POST',
            url: API_BASE_URL + '/graphql',
            headers,
            data: requestBody
        };
        const response = await axios(options);
        if (response.data.data.addFlight.id) {
            location.reload()
        } else{
            console.error("Could not add!")
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-8">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flight Name</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    {/* <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div> */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cost</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={cost} onChange={(e) => setCost(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Of Seats</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={seats} onChange={(e) => setSeats(e.target.value)} required />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-8">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Start
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Destination
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Via
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Departure Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="col" className="px-6 py-3">
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={start} onChange={(e) => setStart(e.target.value)} required />
                            </td>
                            <td scope="col" className="px-6 py-3">
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={destination} onChange={(e) => setDestination(e.target.value)} required/>
                            </td>
                            <td scope="col" className="px-6 py-3">
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={via} onChange={(e) => setVia(e.target.value)} required/>
                            </td>
                            <td scope="col" className="px-6 py-3">
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={travelTime} onChange={(e) => setTravelTime(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex gap-5 mt-2 w-full">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-1 px-2 rounded-md" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}