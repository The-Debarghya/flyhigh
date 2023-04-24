import { faPlane, faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Flight({props}) {

    function calculatePercent(cost, newCost) {
        const diff = cost - newCost
        return (diff/cost)*100
    }

    return (
        <>
            <div className="h-32 bg-slate-100 rounded-md flex items-center justify-between text-xl py-5 px-7 relative">
                <div className="flex items-center gap-7">
                    <p className="font-bold font-large">{props.name}</p>
                </div>
                <div className="flex items-center gap-7">
                    <div className="flex flex-col justify-center items-center">
                        <a className="font-bold">{props.travelTime ? props.travelTime : "12:30 PM"}</a>
                        <a>{props.start}</a>
                    </div>
                    <a><FontAwesomeIcon icon={faPlane} size="lg" /></a>
                    <div className="flex flex-col justify-center items-center">
                        <a className="font-bold">12:30 PM</a>
                        <a>{props.destination}</a>
                    </div>
                </div>

                <div className="font-bold">
                    <FontAwesomeIcon icon={faPlaneUp} size="lg" className="mr-4" />
                    {props.seats} seats
                </div>

                <div className="flex flex-col justify-center items-center">
                    <a className="font-bold">Via</a>
                    <a>{props.via ? props.via : "N/A"}</a>
                </div>

                <div className="flex flex-col justify-center items-center text-2xl">
                    <a className="font-bold text-4xl">₹ {props.updatedCost.toFixed(0)}</a>
                    <span className="text-cred line-through">
                        <span style={{
                            color: "black"
                        }}>&nbsp;{props.cost.toFixed(0)}&nbsp;</span>
                    </span>
                </div>

                {/* Offer */}
                <div className="absolute bottom-0 right-0 bg-cred text-white px-5 py-1 text-sm rounded-br-lg rounded-tl-lg">
                    <a>{calculatePercent(props.cost, props.updatedCost).toFixed(1)}% off on total price</a>
                </div>
            </div>
        </>
    );
}