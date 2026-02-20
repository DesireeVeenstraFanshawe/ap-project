
import "./venueCard.css"

import { Link } from "react-router"

export default function OwnerVenueCard (props) {

    return (
        <>
            <section className="venueCard">
                <p>Img</p>
                <p className="venueName"><Link to="/owner-details" >Phil's Bar & Burders</Link></p>
                <div className="venueRankings">
                    <p className="frequencyStatus">Not too busy</p>
                    <p className="venueCost">$</p>
                    <p className="venueScore">4.3</p>
                </div>
            </section>
        </>
    )
}