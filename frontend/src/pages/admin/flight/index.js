import { Fragment, useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from 'next/router';
import { API_BASE_URL } from "@/config/route";
import axios from "axios";

export default function () {

    let [isOpen, setIsOpen] = useState(false)
    const [flights, setflights] = useState([])
    const [id, setId] = useState(0)
    const [via, setVia] = useState("")
    const [seats, setSeats] = useState("")

    async function closeModal() {
        let flag = 0
        if (seats != "") {
            const headers = {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            };
            let requestBody = {
                query: `mutation{
                          updateSeats(id:${id}, seats:${parseInt(seats)})
                        }`
            };
            const options = {
                method: 'POST',
                url: API_BASE_URL + '/graphql',
                headers,
                data: requestBody
            };
            const response = await axios(options);
            if (response.data.data.updateSeats) {
                flag = 1
            } else {
                console.error("Not Updated")
            }
        }
        if (via != "") {
            const headers = {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            };
            let requestBody = {
                query: `mutation{
                          updateVia(id:${id}, via:"${via}")
                        }`
            };
            const options = {
                method: 'POST',
                url: API_BASE_URL + '/graphql',
                headers,
                data: requestBody
            };
            const response = await axios(options);
            if (response.data.data.updateVia) {
                flag = 1              
            } else {
                console.error("Not Updated Via")
            }
        }
        if (flag == 1) {
            location.reload()
        }
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const router = useRouter();

    async function fetchAll() {
        const headers = {
            'content-type': 'application/json'
        };
        let requestBody = {
            query: `query flights{
                      flights{
                          id
                          start
                          destination
                          cost
                          via
                          seats
                          name
                          travelTime
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
        setflights(response.data.data.flights.sort((a,b) => a.id - b.id).slice(0,100));
    }

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage

        // If JWT token is not present, redirect to login page
        if (!jwtToken) {
            router.push('/admin/login');
        } 
        fetchAll()
    }, []);
    return (
        <>
            <Navbar />
            <div className="p-8">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Airlines
                                </th>
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
                                <th scope="col" className="px-6 py-3">
                                    Seats
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cost
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={flight.id}>
                                        <th scope="row"
                                            className="px-6 py-4 ">
                                            {flight.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {flight.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {flight.start}
                                        </td>
                                        <td className="px-6 py-4">
                                            {flight.destination}
                                        </td>
                                        <td className="px-6 py-4">
                                            {flight.via ? flight.via : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {flight.travelTime ? flight.travelTime : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {flight.seats}
                                        </td>
                                        <td className="px-6 py-4">
                                            {flight.cost}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {setIsOpen(true); setId(parseInt(flight.id))}}>Edit</a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/*  Modal  */}

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Update Entry
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-base font-bold mb-2">Via</label>
                                            <input value={via}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="ex-Kolkata" onChange={(e) => setVia(e.target.value)}/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-base font-bold mb-2">Seats</label>
                                            <input value={seats}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="150" onChange={(e) => setSeats(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}