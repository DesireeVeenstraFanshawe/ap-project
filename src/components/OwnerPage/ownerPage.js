

import Header from "../Header/Header"
import OwnerVenueCard from "../OwnerVenueCard/ownerVenueCard"

export default function OwnerPage (props) {

    return (
        <>
            <Header/>
            <section id="homeSection">
                <h1>Managed Venues</h1>
                <OwnerVenueCard/>
            </section>
        </>
    )
}