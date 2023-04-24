import { faMagnifyingGlass, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import logo from "../assets/logo.png";

export default function Header({dataRef, searchFlights}){
    return (
        <div className="flex w-full justify-center">
            <Image src={logo} width={120} height={40} alt="logo" />
            <div className="w-44 bg-slate-100 rounded-md border-slate-200 border-2 px-2 py-1">
                <a className="font-sans font-light">Departure City</a>
                <input className="w-full bg-transparent border-0 text-2xl font-extrabold" onChange={(e)=>dataRef.current.departure = e.target.value} />
            </div>    
            <div className="mx-4 flex items-center">
                <FontAwesomeIcon icon={faPlane} style={{color: "#666666",}} size="2xl" />
            </div>
            <div className="w-44 bg-slate-100 rounded-md border-slate-200 border-2 px-2 py-1 mr-6">
                <a className="font-sans font-light">Arrival City</a>
                <input className="w-full bg-transparent border-0 text-2xl font-extrabold" onChange={(e)=>dataRef.current.destination = e.target.value} />
            </div>        
            <div className="w-44 bg-slate-100 rounded-md border-slate-200 border-2 px-2 py-1 mr-6">
                <a className="font-sans font-light">Via</a>
                <input className="w-full bg-transparent border-0 text-2xl font-extrabold" onChange={(e)=>dataRef.current.via = e.target.value} />
            </div>
            <div className="w-44 bg-slate-100 rounded-md border-slate-200 border-2 px-2 py-1 mr-6">
                <a className="font-sans font-light">Max Cost</a>
                <input className="w-full bg-transparent border-0 text-2xl font-extrabold" onChange={(e)=>dataRef.current.maxCost = e.target.value} />
            </div>
            <button className="w-44 bg-cblue text-white rounded-md">
                <a className="text-2xl" onClick={searchFlights}><FontAwesomeIcon icon={faMagnifyingGlass} className="mr-3" />Search</a>
            </button>
        </div>
    )
}