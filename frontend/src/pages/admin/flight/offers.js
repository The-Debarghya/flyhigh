import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from "@/config/route";
import axios from "axios";

export default function ManageOffers() {
    const router = useRouter()
    const [cost, setCost] = useState("")
    const [name, setName] = useState("")
    const [id, setId] = useState(0)

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage

        // If JWT token is not present, redirect to login page
        if (!jwtToken) {
            router.push('/admin/login');
        }
    }, []);

    async function handleSubmit() {
        let response;
        if (name == "") {
            const headers = {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            };
            let requestBody = {
                query: `mutation{
                          updateUpdatedCost(id:${id}, cost:${parseFloat(cost)})
                        }`
            };
            const options = {
                method: 'POST',
                url: API_BASE_URL + '/graphql',
                headers,
                data: requestBody
            };
            response = await axios(options);
            console.log(response.data)
        } else {
            const headers = {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            };
            let requestBody = {
                query: `mutation{
                          updateCostByName(name:"${name}", cost:${parseFloat(cost)})
                        }`
            };
            const options = {
                method: 'POST',
                url: API_BASE_URL + '/graphql',
                headers,
                data: requestBody
            };
            response = await axios(options);
            console.log(response.data)
        }
    }

    return (
        <>
        <Navbar />
            <div className="p-8">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flight ID</label>
                        <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={id} onChange={(e) => setId(e.target.value)} required />
                    </div>
                    {/* <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div> */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Updated Cost</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={cost} onChange={(e) => setCost(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="flex gap-5 mt-2 w-full">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-1 px-2 rounded-md" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}