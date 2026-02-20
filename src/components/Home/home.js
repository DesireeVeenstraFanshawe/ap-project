import Header from "../Header/Header";
import VenueCard from "../VenueCard/venueCard";

import "./home.css"

/* Styles */
import "../baseStyles.css"


export default function Home (props) {

    return (
        <>
            <Header/>
            <section id="homeSection">
                <h1>Popular Bars in AREA</h1>
                <VenueCard/>
                <h1>Party Till 4 AM</h1>
                <h1>Weekend Dives</h1>
            </section>
        </>
    )
}