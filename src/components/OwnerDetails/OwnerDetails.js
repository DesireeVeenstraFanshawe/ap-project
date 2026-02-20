
import EventCard from "../EventCard/eventCard"
import Header from "../Header/Header"
import "./ownerDetails.css"

export default function OwnerDetails (props) {

     return (
            <>
                <Header/>
                <section id="detailSection">
                    <h1>Phil's Bar & Burgers</h1>
                    <section id="imageSection">
                        <p>Images here</p>
                    </section>
                    <section className="venueRankings">
                        <p className="frequencyStatus">Not too busy</p>
                        <p className="venueCost">$</p>
                        <p className="venueScore">4.3</p>
                    </section>
                    <section id="venueDesc">
                        <h2>About</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at lorem vitae est ornare luctus. 
                            Pellentesque a arcu nec lectus mattis euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at lorem vitae est ornare luctus. 
                            Pellentesque a arcu nec lectus mattis euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                        </p>
                    </section>
                    <section id="offersSection">
                        <hr></hr>
                        <h2>Food & Drink Offered</h2>
                        
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at lorem vitae est ornare luctus. 
                            Pellentesque a arcu nec lectus mattis euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                        </p>
                        <hr></hr>
                    </section>
                    <section id="eventsSection">
                        <h2>Events</h2>
                        <EventCard/>
                    </section>
            </section>
            </>
            
    
        )
}